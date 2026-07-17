async function saveIngredients(
  categories: Record<string, string[]>,
): Promise<Response> {
  try {
    const response = await fetch(`/api/saveIngredients`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categories }),
    });

    if (!response.ok) {
      throw new Error("Failed to save ingredients");
    }
    return response;
  } catch (error) {
    console.error("Error saving ingredients:", error);
    throw error;
  }
}

export { saveIngredients };
