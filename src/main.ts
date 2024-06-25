import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importe o router que configuramos

import './style.css';
import './demos/ipc';

const app = createApp(App);

app.use(router); // Use o router na sua aplicação

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
