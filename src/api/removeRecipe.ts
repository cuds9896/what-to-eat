async function removeRecipe(id: number): Promise<Response> {
  try {
    const response = await fetch("http://localhost:3000/removeRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    return response;
  } catch (error) {
    console.error("Error removing recipe:", error);
    throw error;
  }
}

export { removeRecipe };
