import type { ingredientType } from "../types/ingredientType";

async function getIngredients(): Promise<ingredientType[]> {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${apiBaseUrl}/getIngredients`, {
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
