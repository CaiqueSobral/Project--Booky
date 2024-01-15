export async function authUser(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:3001/api/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const auth = await response.json();

    return auth;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
