import type { ingredientType } from "../types/ingredientType";

async function getIngredients(): Promise<ingredientType[]> {
  try {
    const response = await fetch("http://localhost:3000/getIngredients", {
      method: "GET",
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
