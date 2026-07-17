async function signup(username: string, password: string) {
  try {
    const response = await fetch(`/api/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}

export { signup };
