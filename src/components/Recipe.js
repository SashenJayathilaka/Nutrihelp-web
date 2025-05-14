import { useEffect, useState } from "react";
import { getRecipes } from "../routes/CreateRecipe/data/db/db";
import "../styles/recipe.css";
import { RefreshCcwIcon } from "lucide-react";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [refresh, setRefetch] = useState(false);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:80/api/recipe/", {
        method: "POST", // Based on your backend
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Fetched Recipes:", data);

      // Save to state and render in component
      //setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipes();
      setRecipes(data);
    };
    fetchData();
    //fetchRecipes();
  }, [refresh]); // Trigger on refresh

  return (
    <div
      id="no-bg"
      className="w-full bg-transparent px-4 sm:px-8 md:px-16 py-12 flex justify-center"
    >
      <div id="no-bg" className="max-w-[1600px] w-full">
        <div
          id="no-bg"
          className="flex flex-col md:flex-row justify-between items-center mb-8 px-4"
        >
          <h2
            id="no-bg"
            className="text-3xl sm:text-4xl font-bold mb-4 md:mb-0"
          >
            My Recipes
          </h2>
          <button
            id="no-bg"
            className="bg-[#BA49E7] text-lg sm:text-xl text-white font-semibold px-6 sm:px-12 py-3 sm:py-4 rounded-full flex justify-between gap-x-3"
            onClick={() => setRefetch((prev) => !prev)}
          >
            See All
            <RefreshCcwIcon size={24} className="animate-spin" />
          </button>
        </div>

        {/* Recipe Cards */}
        <div
          id="no-bg"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-4"
        >
          {recipes.map((item, index) => (
            <div
              key={index}
              id="no-bg"
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col max-w-4/6 cursor-pointer"
            >
              <img
                src={item.image}
                alt="Delicious Recipe"
                id="no-bg"
                className="w-full h-52 object-cover"
              />
              <div
                id="no-bg"
                className="bg-gray-100 flex items-center justify-between w-full px-8 py-3 mt-auto"
              >
                <p
                  id="no-bg"
                  className="text-sm gap-x-1 font-semibold text-gray-800 flex justify-center items-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 7.5C15 9.48912 14.2098 11.3968 12.8033 12.8033C11.3968 14.2098 9.48912 15 7.5 15C5.51088 15 3.60322 14.2098 2.1967 12.8033C0.790176 11.3968 0 9.48912 0 7.5C0 5.51088 0.790176 3.60322 2.1967 2.1967C3.60322 0.790176 5.51088 0 7.5 0C9.48912 0 11.3968 0.790176 12.8033 2.1967C14.2098 3.60322 15 5.51088 15 7.5ZM7.5 3.28125C7.5 3.15693 7.45061 3.0377 7.36271 2.94979C7.2748 2.86189 7.15557 2.8125 7.03125 2.8125C6.90693 2.8125 6.7877 2.86189 6.69979 2.94979C6.61189 3.0377 6.5625 3.15693 6.5625 3.28125V8.4375C6.56253 8.52012 6.58439 8.60127 6.62588 8.67273C6.66737 8.74418 6.72701 8.80339 6.79875 8.84437L10.08 10.7194C10.1877 10.7776 10.3139 10.7913 10.4315 10.7577C10.5492 10.7241 10.6491 10.6458 10.7099 10.5396C10.7706 10.4333 10.7873 10.3075 10.7565 10.189C10.7257 10.0706 10.6498 9.96885 10.545 9.90563L7.5 8.16562V3.28125Z"
                      fill="#6F42C1"
                    />
                  </svg>
                  {item.preparation_time} Mins
                </p>
                <p
                  id="no-bg"
                  className="text-sm gap-x-1 font-semibold text-gray-800 flex justify-center items-center"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 15C5.51088 15 3.60322 14.2098 2.1967 12.8033C0.790176 11.3968 0 9.48912 0 7.5C0 5.51088 0.790176 3.60322 2.1967 2.1967C3.60322 0.790176 5.51088 0 7.5 0C9.48912 0 11.3968 0.790176 12.8033 2.1967C14.2098 3.60322 15 5.51088 15 7.5C15 9.48912 14.2098 11.3968 12.8033 12.8033C11.3968 14.2098 9.48912 15 7.5 15ZM8.29406 7.36406C8.81367 7.17712 9.25066 6.81285 9.5281 6.3354C9.80553 5.85794 9.90562 5.29791 9.81074 4.75391C9.71586 4.20991 9.43209 3.71683 9.00941 3.36148C8.58672 3.00613 8.05221 2.81131 7.5 2.81131C6.94779 2.81131 6.41328 3.00613 5.99059 3.36148C5.56791 3.71683 5.28414 4.20991 5.18926 4.75391C5.09438 5.29791 5.19447 5.85794 5.4719 6.3354C5.74934 6.81285 6.18633 7.17712 6.70594 7.36406C5.12906 7.74469 3.75 9.16406 3.75 10.3125C3.75 10.6828 3.88594 11.2453 4.6875 11.2453H10.3125C11.1141 11.2453 11.25 10.6828 11.25 10.3125C11.25 9.165 9.87187 7.74375 8.29406 7.36406Z"
                      fill="#6F42C1"
                    />
                  </svg>
                  {item.total_servings} Servings
                </p>
                <p
                  id="no-bg"
                  className="text-sm gap-x-1 font-semibold text-gray-800 flex justify-center items-center"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 10.7143C15 10.4301 14.8871 10.1576 14.6862 9.95667C14.4853 9.75574 14.2127 9.64286 13.9286 9.64286H11.7857C11.5016 9.64286 11.229 9.75574 11.0281 9.95667C10.8272 10.1576 10.7143 10.4301 10.7143 10.7143V13.9286C10.7143 14.2127 10.8272 14.4853 11.0281 14.6862C11.229 14.8871 11.5016 15 11.7857 15H13.9286C14.2127 15 14.4853 14.8871 14.6862 14.6862C14.8871 14.4853 15 14.2127 15 13.9286V10.7143ZM9.64286 6.42857C9.64286 6.14441 9.52997 5.87189 9.32904 5.67096C9.12811 5.47003 8.85559 5.35714 8.57143 5.35714H6.42857C6.14441 5.35714 5.87189 5.47003 5.67096 5.67096C5.47003 5.87189 5.35714 6.14441 5.35714 6.42857V13.9286C5.35714 14.2127 5.47003 14.4853 5.67096 14.6862C5.87189 14.8871 6.14441 15 6.42857 15H8.57143C8.85559 15 9.12811 14.8871 9.32904 14.6862C9.52997 14.4853 9.64286 14.2127 9.64286 13.9286V6.42857ZM4.28572 1.07143C4.28572 0.787268 4.17283 0.514746 3.9719 0.313814C3.77097 0.112882 3.49845 0 3.21429 0H1.07143C0.787269 0 0.514747 0.112882 0.313815 0.313814C0.112883 0.514746 0 0.787268 0 1.07143V13.9286C0 14.2127 0.112883 14.4853 0.313815 14.6862C0.514747 14.8871 0.787269 15 1.07143 15H3.21429C3.49845 15 3.77097 14.8871 3.9719 14.6862C4.17283 14.4853 4.28572 14.2127 4.28572 13.9286V1.07143Z"
                      fill="#6F42C1"
                    />
                  </svg>
                  Easy
                </p>
              </div>
              <div
                id="no-bg"
                className="flex flex-col items-start justify-start text-left p-4"
              >
                <p id="no-bg" className="font-semibold text-3xl">
                  {item.recipe_name}
                </p>
                <p id="no-bg" className="underline text-[#9747FF]">
                  View Recipe
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
