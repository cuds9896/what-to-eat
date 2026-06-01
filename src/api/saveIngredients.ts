async function saveIngredients(
  categories: Record<string, string[]>,
): Promise<Response> {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${apiBaseUrl}/saveIngredients`, {
      method: "POST",
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
