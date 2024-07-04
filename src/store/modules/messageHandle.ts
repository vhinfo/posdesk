import { Module, ActionContext } from 'vuex';

// Tipos
interface Alert {
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
  active: boolean;
}

interface MessageState {
  alert: Alert;
  timeoutId: NodeJS.Timeout | null; // Tipo para armazenar o ID do timeout
}

const state: MessageState = {
  alert: {
    message: '',
    type: 'error',
    active: false,
  },
  timeoutId: null,
};

const actions = {
  async alert({ commit, state }: ActionContext<MessageState, any>, alert: Alert): Promise<void> {
    // Cancelar o timeout existente se houver
    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
    }
    
    commit('setAlert', alert);
    const timeoutId = setTimeout(() => {
      commit('removeAlert');
    }, 5000);

    commit('setTimeoutId', timeoutId); // Armazenar o novo ID do timeout
  },

  async removeAlert({ commit, state }: ActionContext<MessageState, any>): Promise<void> {
    // Cancelar o timeout se estiver ativo
    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
    }
    commit('removeAlert');
  },
};

const mutations = {
  setAlert(state: MessageState, alert: Alert) {
    state.alert.type = alert.type;
    state.alert.message = alert.message;
    state.alert.active = true;
  },

  removeAlert(state: MessageState) {
    state.alert.type = 'error';
    state.alert.message = '';
    state.alert.active = false;
    state.timeoutId = null; // Limpar o ID do timeout ao remover a mensagem
  },

  setTimeoutId(state: MessageState, timeoutId: NodeJS.Timeout) {
    state.timeoutId = timeoutId;
  },
};

const getters = {
  getAlert(state: MessageState): Alert {
    return state.alert;
  },
};

const messageModule: Module<MessageState, any> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export default messageModule;
