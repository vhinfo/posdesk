// src/controllers/authController.ts

import store from '../store';

export async function login(user: string, password: string): Promise<boolean> {
  return window.authService.authenticate(user, password);
}

export async function getStoreCashiers(): Promise<any> {
  return window.authService.getStoreCashiers();
}

export async function validateAuth(): Promise<{ name: string, storeName: string, cashierName: string, isManager: boolean }> {
  const user = await window.authService.validateAuthentication();
  store.commit('auth/setUser', user); 
  return user;
}

export async function setCashier(cashierId: number): Promise<any> {
  return window.authService.setCashier(cashierId);
}

export async function logout(): Promise<boolean> {
  return window.authService.makeLogout();
}
