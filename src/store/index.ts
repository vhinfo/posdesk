import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import messageHandle from './modules/messageHandle';
// import cashierStore from './modules/cashierStore';
// import productStore from './modules/productStore';
// import salesStore from './modules/salesStore';


const store = new Vuex.Store({
  modules:{
    auth,
    messageHandle,
    // cashierStore,
    // productStore, 
    // salesStore,
  },
  plugins:[createPersistedState()]
})
export default store
