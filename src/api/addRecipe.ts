import type { recipeType } from "../types/recipeType";

async function addRecipe(recipe: recipeType): Promise<Response> {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${apiBaseUrl}/addRecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error("Failed to add recipe");
    }
    return response;
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
}

export { addRecipe };
