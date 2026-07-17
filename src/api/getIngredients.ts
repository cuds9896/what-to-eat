import type { ingredientType } from "../types/ingredientType";

async function getIngredients(): Promise<ingredientType[]> {
  try {
    const response = await fetch(`/api/getIngredients`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch ingredients");
    }
    const ingredients = await response.json();
    return ingredients;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
}

export { getIngredients };
