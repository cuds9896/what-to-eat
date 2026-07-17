async function login(username: string, password: string) {
  try {
    const response = await fetch(`/api/login`, {
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
    console.error("Error during login:", error);
    throw error;
  }
}

export { login };
