import { Module, MutationTree, GetterTree } from 'vuex';
import { AuthState, User } from '../../types';

const state: AuthState = {
  user: null,
};

const getters: GetterTree<AuthState, unknown> = {
  getUser: (state: AuthState): User | null => state.user,
  getUserName: (state: AuthState): string | null => state.user ? state.user.name : null,
  getStoreName: (state: AuthState): string | null => state.user ? state.user.storeName : null,
  getCashierName: (state: AuthState): string | null => state.user ? state.user.cashierName : null,
  isUserManager: (state: AuthState): boolean => state.user ? state.user.isManager : false,
};

const mutations: MutationTree<AuthState> = {
  setUser(state: AuthState, user: User) {
    state.user = user;
  },
  clearUser(state: AuthState) {
    state.user = null;
  },
};

const auth: Module<AuthState, unknown> = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default auth;
