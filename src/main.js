import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Weavy } from '@weavy/uikit-web'

const pinia = createPinia();
const weavy = new Weavy();

weavy.url = "https://5f62a3a38f4e48c69505842522ab01c3.weavy.io";
weavy.tokenUrl = "https://example.com/myapp/token";

createApp(App).use(router).use(pinia).use(VueAxios, axios).provide("weavy", weavy).mount('#app');