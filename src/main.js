import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'
import  Toast  from 'vue-toastification'
import "vue-toastification/dist/index.css";

// Configura Vue Toastification con opciones (opcional)
const options = {
    // Ejemplo de opciones
    timeout: 5000,
    position: "top-right",
  };

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueAxios, axios).use(Toast, options).mount('#app');