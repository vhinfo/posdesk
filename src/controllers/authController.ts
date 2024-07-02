// src/controllers/authController.ts

export async function validateAuth(): Promise<boolean> {
  return window.authService.validateAuthentication();
}

export async function login(user:string, password:string): Promise<boolean> {
  return window.authService.authenticate(user, password);
}

export async function getStoreCashiers(): Promise<any> {
  return window.authService.getStoreCashiers();
}

export async function setCashier(cashierId:number): Promise<any> {
  return window.authService.setCashier(cashierId);
}
