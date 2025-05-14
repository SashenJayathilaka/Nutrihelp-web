import { openDB } from "idb";

export const initDB = async () => {
  return openDB("RecipeDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("recipes")) {
        db.createObjectStore("recipes", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const saveRecipe = async (recipe) => {
  const db = await initDB();
  await db.add("recipes", recipe);
};

export const getRecipes = async () => {
  const db = await initDB();
  const all = await db.getAll("recipes");
  console.log("Fetched from IDB:", all); // Add this line
  return all;
};
