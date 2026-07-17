async function me() {
  try {
    const response = await fetch(`/api/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();
    return user;
  } catch (error) {
    return;
  }
}

export { me };
