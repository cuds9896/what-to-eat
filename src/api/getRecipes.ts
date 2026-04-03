import type { recipeType } from "../types/recipeType";

async function getRecipes(): Promise<recipeType[]> {
  try {
    const response = await fetch("http://localhost:3000/getRecipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

export { getRecipes };
