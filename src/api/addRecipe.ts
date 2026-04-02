import type { recipeType } from "../types/recipeType";

async function addRecipe(recipe: recipeType): Promise<void> {
  try {
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error("Failed to add recipe");
    }
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
}

export { addRecipe };
