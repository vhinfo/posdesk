// authController.ts no Vue
export async function checkAuth() {
  const isAuthenticated = await window.authService.validateAuthentication();
  return isAuthenticated;
}

export async function login(email: string, password: string) {
  const isAuthenticated = await window.authService.authenticate(email, password);
  return isAuthenticated;
}
