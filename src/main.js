import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import '@/style.css';

const app = createApp(App)

const pinia = createPinia()   // ✔ buat dulu, simpan ke variabel

app.use(pinia)               // ✔ baru gunakan
app.use(router)

app.mount('#app')
