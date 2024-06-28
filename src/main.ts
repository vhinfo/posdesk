import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import './colors.css';
import './controllers/demos/ipc';

const app = createApp(App);

app.use(router); // Use o router na sua aplicação

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});