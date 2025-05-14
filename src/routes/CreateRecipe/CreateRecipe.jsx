import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FramerClient from "../../components/framer-client.jsx";
import {
  cuisineListDB,
  getCuisineList,
  getIngredientsList,
  ingredientListDB,
} from "./Config.js";
import { saveRecipe } from "./data/db/db.js";

// Create Recipe page
function CreateRecipe() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  //SectionRecipeDescription
  const [recipeName, setRecipeName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [totalServings, setTotalServings] = useState("");

  //SectionIngredients
  const [ingredientCategory, setIngredientCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [instructions, setInstructions] = useState("");
  const [tableData, setRecipeTable] = useState([]);
  //const [isEditing, setIsEditing] = useState("");

  const [ingredients, setIngredients] = useState([
    {
      ingredientCategory: "",
      ingredient: "",
      ingredientQuantity: "",
    },
  ]);

  //==================== Handle changes to the fields ====================

  //--------------- Recipe Description Section -----------------

  //Handle changes to the Recipe Name field
  const handleRecipeNameChange = (value) => {
    setRecipeName(value);
    //console.log("Recipe Name: " + value);
  };

  //Handle changes to the Cuisine field
  const handleCuisineChange = (value) => {
    setCuisine(value);
    //console.log("Cuisine: " + value);
  };

  //--------------- Cooking Details Section -----------------

  //Handle changes to the Preparation Time field
  const handlePreparationTimeChange = (value) => {
    setPreparationTime(value);
    console.log("Preparation Time: " + value);
  };

  //Handle changes to the Total Servings field
  const handleTotalServingsChanges = (value) => {
    setTotalServings(value);
    console.log("Total Servings: " + value);
  };

  //--------------- Ingredients Section -----------------

  const handleIngredientCategoryChange = (value) => {
    setIngredientCategory(value);
    console.log("setIngredientCategory: " + value);
  };

  const handleIngredientQuantityChange = (value) => {
    setIngredientQuantity(value);
    console.log("setIngredientQuantity: " + value);
  };

  const handleIngredientChange = (value) => {
    setIngredient(value);
    console.log("setIngredient: " + value);
  };

  /*   const handleIsEditingChange = (value) => {
    setIsEditing(value);
    console.log("isEditing: " + value);
  }; */

  if (cuisineListDB.length < 2) {
    getCuisineList();
  }

  if (ingredientListDB.ingredient.length < 2) {
    getIngredientsList();
  }

  const handelIngredientsInTable = () => {
    setIngredients((prev) => [
      ...prev,
      { ingredientCategory, ingredient, ingredientQuantity },
    ]);
    setRecipeTable((prev) => [
      ...prev,
      { ingredientCategory, ingredient, ingredientQuantity },
    ]);
    setIngredientCategory("");
    setIngredient("");
    setIngredientQuantity("");
  };

  const handleRemoveTableData = () => {};

  //--------------- Instructions Section -----------------

  //Handle changes to the Instructions field
  const handleInstructionsChange = (value) => {
    setInstructions(value);
    console.log("Instructions: " + value);
  };

  //==================== Send data to the Supabase ====================
  const sendDataToSupabase = async () => {
    try {
      const file = fileInputRef.current.files[0];

      if (!isFormValid()) {
        setAttemptedSubmit(true);
        window.scrollTo(0, 0);
        return;
      }

      setAttemptedSubmit(false);

      const ingredientId = [];
      const ingredientQuantity = [];
      let cuisineId;
      const userId = 15;

      cuisineListDB.forEach((element) => {
        if (cuisine === element.label) {
          cuisineId = element.id;
        }
      });

      tableData.forEach((row) => {
        ingredientListDB.ingredient.forEach((element) => {
          if (row.ingredient === element.label) {
            ingredientId.push(element.id);
            ingredientQuantity.push(parseInt(row.ingredientQuantity));
          }
        });
      });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result;

          const formData = {
            user_id: userId,
            recipe_name: recipeName,
            cuisine_id: cuisineId,
            preparation_time: preparationTime,
            total_servings: totalServings,
            ingredient_id: ingredientId,
            ingredient_quantity: ingredientQuantity,
            instructions: instructions,
            image: base64Image,
          };

          await saveRecipe(formData);
          //alert("Recipe saved locally in IndexedDB!");
        };
        reader.readAsDataURL(file);
      } else {
        const formData = {
          user_id: userId,
          recipe_name: recipeName,
          cuisine_id: cuisineId,
          preparation_time: preparationTime,
          total_servings: totalServings,
          ingredient_id: ingredientId,
          ingredient_quantity: ingredientQuantity,
          instructions: instructions,
          image: "",
        };

        await saveToIndexedDB(formData);
        window.dispatchEvent(new Event("recipeUpdated"));

        fetch("http://localhost:80/api/recipe/", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            Origin: "http://localhost:3000/",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.statusCode === 201) {
              console.log("Data successfully written to Supabase!");
              //alert("Recipe Creation was successful!");
              navigate("/searchRecipes");
            } else {
              console.log(data);
              alert("Recipe Creation was unsuccessful! Please try Again");
            }
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      }
    } catch (error) {
      console.error("Error writing document:", error);
    }

    navigate("/recipe");
  };

  // Function to validate all fields are filled
  const isFormValid = () => {
    return (
      recipeName &&
      cuisine &&
      totalServings &&
      preparationTime &&
      tableData &&
      instructions
      // isImageAdded
    );
  };

  const [isImageAdded, setIsImageAdded] = useState(false);

  const handleImageAdded = () => {
    setIsImageAdded(true);
  };

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  /*   const fileInputRef = useRef(null);

  const [recipeName, setRecipeName] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [totalServings, setTotalServings] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [step, setStep] = useState("");

  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([
    {
      category: "",
      ingredient: "",
      quantity: "",
    },
  ]); */

  /*   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Upload image to Supabase Storage
      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `Create Recipe/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("my-recipe-page")
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("my-recipe-page")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData?.publicUrl;
      }

      // Step 2: Insert recipe data into Supabase
      const { data, error } = await supabase.from("my-recipe").insert([
        {
          creater_id: 1,
          recipeName,
          cuisineType,
          preparationTime,
          totalServings,
          ingredients, // already an array of objects
          instructions, // already an array of strings
          image_url: imageUrl || null, // use the uploaded image URL or null if no image was uploaded
        },
      ]);

      if (error) {
        console.error("Insert error:", error.message);
        alert("Failed to save recipe.");
      } else {
        alert("Recipe created successfully!");
        console.log("Inserted recipe:", data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred while saving your recipe.");
    }
  }; */

  //==================== Render the component ====================
  return (
    <FramerClient>
      <div
        id="no-bg"
        className="w-full flex justify-center items-center bg-purple-100"
      >
        <div
          id="no-bg"
          className="w-full min-h-screen flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
        >
          <div
            id="no-bg"
            className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] max-w-[1400px] bg-[#FFFEFE] rounded-lg flex flex-col sm:flex-row"
          >
            {/* Main Form Area - full width on mobile, constrained on larger screens */}
            <div
              id="no-bg"
              className="w-full  p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
            >
              {/* Header - flex column on mobile, row on sm+ */}
              <div
                id="no-bg"
                className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div id="no-bg" className="w-full flex justify-center">
                  <h1
                    id="no-bg"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center sm:text-left mb-4 sm:mb-0"
                  >
                    Create Recipe
                  </h1>
                </div>
              </div>
              {/* Recipe Description Section */}
              <div
                id="no-bg"
                className="bg-purple-100 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
              >
                <h2
                  id="no-bg"
                  className="text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6"
                >
                  Recipe Description
                </h2>
                <div
                  id="no-bg"
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8"
                >
                  <div
                    id="no-bg"
                    className="flex flex-col justify-start items-start gap-4 sm:gap-6 w-full"
                  >
                    <div
                      id="no-bg"
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 w-2/3"
                    >
                      <label
                        id="no-bg"
                        className="w-full sm:w-1/3 text-sm sm:text-base md:text-lg"
                      >
                        Recipe Name
                      </label>
                      <input
                        id="no-bg"
                        className="w-full sm:w-2/3 rounded-xl h-10 sm:h-12 border border-gray-400 px-4"
                        placeholder="Enter Recipe Name"
                        value={recipeName}
                        onChange={(e) => handleRecipeNameChange(e.target.value)}
                      />
                    </div>

                    <div
                      id="no-bg"
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 w-2/3"
                    >
                      <label
                        id="no-bg"
                        className="w-full sm:w-1/3 text-sm sm:text-base md:text-lg"
                      >
                        Cuisine Type
                      </label>
                      <input
                        id="no-bg"
                        className="w-full sm:w-2/3 rounded-xl h-10 sm:h-12 border border-gray-400 px-4"
                        placeholder="Enter Cuisine Type"
                        value={cuisine}
                        onChange={(e) => handleCuisineChange(e.target.value)}
                      />
                    </div>
                  </div>

                  <div
                    id="no-bg"
                    className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-end gap-4 sm:gap-6 sm:w-1/3"
                  >
                    <label
                      id="no-bg"
                      className="text-sm sm:text-base md:text-lg sm:mr-4"
                    >
                      Add Image
                    </label>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      id="file-upload"
                      accept="image/*"
                      //onChange={(e) => setImage(e.target.files[0])}
                      className="hidden"
                    />

                    {/* Styled label as button */}
                    <label
                      htmlFor="file-upload"
                      id="no-bg"
                      className="bg-[#BA49E7] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base cursor-pointer"
                    >
                      Upload Image
                    </label>
                  </div>
                </div>
              </div>
              {/* Cooking Description Section */}
              <div
                id="no-bg"
                className="bg-purple-100 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
              >
                <h2
                  id="no-bg"
                  className="text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6"
                >
                  Cooking Description
                </h2>
                <div id="no-bg" className="flex flex-col gap-4 sm:gap-6 w-full">
                  <div
                    id="no-bg"
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 w-1/2"
                  >
                    <label
                      id="no-bg"
                      className="w-full sm:w-1/3 text-sm sm:text-base md:text-lg"
                    >
                      Preparation Time
                    </label>
                    <input
                      id="no-bg"
                      className="w-full sm:w-2/3 rounded-xl h-10 sm:h-12 border border-gray-400 px-4"
                      placeholder="Enter Preparation Time"
                      value={preparationTime}
                      onChange={(e) =>
                        handlePreparationTimeChange(e.target.value)
                      }
                    />
                  </div>

                  <div
                    id="no-bg"
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 w-1/2"
                  >
                    <label
                      id="no-bg"
                      className="w-full sm:w-1/3 text-sm sm:text-base md:text-lg"
                    >
                      Total Servings
                    </label>
                    <input
                      id="no-bg"
                      className="w-full sm:w-2/3 rounded-xl h-10 sm:h-12 border border-gray-400 px-4"
                      placeholder="Enter Total Servings"
                      value={totalServings}
                      onChange={(e) =>
                        handleTotalServingsChanges(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Ingredients Section */}
              <div
                id="no-bg"
                className="bg-purple-100 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
              >
                <h2
                  id="no-bg"
                  className="text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6"
                >
                  Ingredients
                </h2>
                <div
                  id="no-bg"
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6"
                >
                  <div
                    id="no-bg"
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 sm:w-1/2"
                  >
                    <label
                      id="no-bg"
                      className="w-full sm:w-1/3 text-sm sm:text-base md:text-lg"
                    >
                      Category
                    </label>
                    <select
                      id="no-bg"
                      className="w-full sm:w-2/3 rounded-xl h-10 sm:h-12 border border-gray-400 px-4 bg-white"
                      defaultValue=""
                      onChange={(e) =>
                        handleIngredientCategoryChange(e.target.value)
                      }
                      value={ingredientCategory}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      <option value="meat">Meat</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="grains">Grains</option>
                      <option value="carbs">Carbs</option>
                      <option value="dairy">Dairy</option>
                      <option value="spices">Spices</option>
                    </select>
                  </div>

                  <div
                    id="no-bg"
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 sm:w-1/2"
                  >
                    <label
                      id="no-bg"
                      className="w-full sm:w-1/3 text-sm sm:text-base md:text-lg"
                    >
                      Ingredient
                    </label>
                    <input
                      id="no-bg"
                      className="w-full sm:w-2/3 rounded-xl h-10 sm:h-12 border border-gray-400 px-4"
                      placeholder="Enter Ingredient"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  id="no-bg"
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 w-full"
                >
                  <div
                    id="no-bg"
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 sm:w-1/2"
                  >
                    <label
                      id="no-bg"
                      className="w-full sm:w-1/3 text-sm sm:text-base md:text-lg"
                    >
                      Quantity
                    </label>
                    <select
                      id="no-bg"
                      className="w-full sm:w-2/3 rounded-xl h-10 sm:h-12 border border-gray-400 px-4 bg-white"
                      defaultValue=""
                      value={ingredientQuantity}
                      onChange={(e) =>
                        handleIngredientQuantityChange(e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      <option value="ml">Ml</option>
                      <option value="g">G</option>
                      <option value="cups">Cups</option>
                      <option value="tbsp">Tbsp</option>
                      <option value="tsp">Tsp</option>
                    </select>
                  </div>

                  <div
                    id="no-bg"
                    className="flex items-center justify-end sm:justify-end sm:w-1/2"
                  >
                    <button
                      id="no-bg"
                      className="bg-[#BA49E7] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base"
                      onClick={() => handelIngredientsInTable()}
                    >
                      Add Ingredient +
                    </button>
                  </div>
                </div>

                <div id="no-bg" className="overflow-x-auto">
                  <table
                    id="no-bg"
                    className="min-w-full border border-gray-300"
                  >
                    <thead id="no-bg" className="bg-[#6F42C1] text-white">
                      <tr>
                        <th
                          id="no-bg"
                          className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                        >
                          Category
                        </th>
                        <th
                          id="no-bg"
                          className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                        >
                          Ingredient
                        </th>
                        <th
                          id="no-bg"
                          className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                        >
                          Quantity
                        </th>
                        <th
                          id="no-bg"
                          className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredients.map((item, index) => (
                        <tr id="no-bg" className="bg-[#F4F4F4]" key={index}>
                          <td
                            id="no-bg"
                            className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                          >
                            {item.ingredientCategory}
                          </td>
                          <td
                            id="no-bg"
                            className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                          >
                            {item.ingredient}
                          </td>
                          <td
                            id="no-bg"
                            className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                          >
                            {item.ingredientQuantity}
                          </td>
                          <td
                            id="no-bg"
                            className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                          >
                            {item.ingredientCategory &&
                              item.ingredient &&
                              item.ingredientQuantity && (
                                <div className="flex justify-center items-center gap-x-4">
                                  <div
                                    id="no-bg"
                                    className="text-blue-500 mr-2 cursor-pointer"
                                    onClick={() => {
                                      setIngredientCategory(
                                        item.ingredientCategory
                                      );
                                      setIngredient(item.ingredient);
                                      setIngredientQuantity(
                                        item.ingredientQuantity
                                      );
                                      setIngredients((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                    }}
                                  >
                                    Edit
                                  </div>
                                  <div
                                    id="no-bg"
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => {
                                      setIngredients((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                    }}
                                  >
                                    Delete
                                  </div>
                                </div>
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Instructions Section */}
              <div
                id="no-bg"
                className="bg-purple-100 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
              >
                <h2
                  id="no-bg"
                  className="text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6"
                >
                  Instructions
                </h2>

                <div
                  id="no-bg"
                  className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-4 sm:mb-6"
                >
                  <div id="no-bg" className="w-full sm:w-1/4">
                    <button
                      id="no-bg"
                      className="w-full bg-[#6F42C1] text-white py-2 sm:py-3 px-4 rounded-l-lg font-semibold text-sm sm:text-base"
                    >
                      Step 1:
                    </button>
                  </div>
                  <input
                    id="no-bg"
                    className="w-full sm:w-3/4 rounded-r-lg border border-gray-400 py-2 sm:py-3 px-4"
                    placeholder="Enter step by step instructions here..."
                    value={instructions}
                    onChange={(e) => handleInstructionsChange(e.target.value)}
                  />
                </div>

                <div id="no-bg" className="flex justify-end">
                  <button
                    id="no-bg"
                    className="bg-[#BA49E7] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base"
                    onClick={() => {
                      console.log(instructions);
                      // setInstructions((prev) => [...prev, step]);
                      //setStep("");
                    }}
                  >
                    Add Step +
                  </button>
                </div>
                {/*               {instructions.length > 0 && (
                <div id="no-bg" className="overflow-x-auto mt-4">
                  <table
                    id="no-bg"
                    className="min-w-full border border-gray-300"
                  >
                    <thead id="no-bg" className="bg-[#6F42C1] text-white">
                      <tr>
                        <th
                          id="no-bg"
                          className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                        >
                          Step
                        </th>
                        <th
                          id="no-bg"
                          className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {instructions.map((item, index) => (
                        <tr id="no-bg" className="bg-[#F4F4F4]" key={index}>
                          <td
                            id="no-bg"
                            className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                          >
                            {item}
                          </td>
                          <td
                            id="no-bg"
                            className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                          >
                            <button
                              id="no-bg"
                              className="text-red-500"
                              onClick={() => {
                                setInstructions((prev) =>
                                  prev.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )} */}
              </div>

              {/* Submit Button */}
              <div id="no-bg" className="flex justify-center">
                <button
                  id="no-bg"
                  className="bg-[#4CAF50] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-lg sm:text-xl md:text-2xl w-full sm:w-auto"
                  onClick={sendDataToSupabase}
                >
                  Create Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FramerClient>
  );
}

export default CreateRecipe;
