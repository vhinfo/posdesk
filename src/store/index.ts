import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import messageHandle from './modules/messageHandle';
import sale from './modules/sale';


const store = new Vuex.Store({
  modules:{
    auth,
    messageHandle,
    sale,
  },
  plugins:[createPersistedState()]
})
export default store
