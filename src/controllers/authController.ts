// src/controllers/authController.ts

export async function validateAuth(): Promise<boolean> {
  return window.authService.validateAuthentication();
}

export async function login(user:string, password:string): Promise<any> {
  return window.authService.authenticate(user, password);
}
