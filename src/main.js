import { createApp } from 'vue'
import App from './App.vue'
import axios from './services/axios'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);
app.mount('#app');
