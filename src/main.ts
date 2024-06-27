import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/dist/vuetify.min.css';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import './style.css';

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
