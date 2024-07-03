import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import './colors.css';
import './controllers/demos/ipc';
import store from './store'

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});