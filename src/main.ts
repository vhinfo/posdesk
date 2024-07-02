import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import './colors.css';
import './controllers/demos/ipc';

const app = createApp(App);

app.use(router);

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});