import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'

const pinia = createPinia();
createApp(App).use(router).use(pinia).use(VueAxios, axios).mount('#app')