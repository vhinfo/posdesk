// authController.ts no Vue
export const authController = {
  async checkAuth() {
    try {
      const isAuthenticated = await window.authService.validateAuthentication();
      console.log('Authentication result:', isAuthenticated);
      return isAuthenticated;
    } catch (error) {
      console.error('Error during authentication:', error);
      throw error;
    }
  },
};
