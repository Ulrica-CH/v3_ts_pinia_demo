import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import '@/styles/index.scss' // global css
import router from './router'
createApp(App).use(router).use(ElementPlus).mount('#app')
