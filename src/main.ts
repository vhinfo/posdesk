import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { loadFonts } from './plugins/webfontloader';
import './style.css';
import './controllers/demos/ipc';
import './controllers/authController';

loadFonts();
const app = createApp(App);

app.use(router); // Use o router na sua aplicação

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});