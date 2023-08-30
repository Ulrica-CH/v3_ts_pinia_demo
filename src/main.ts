import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import '@/styles/index.scss' // global css
import router from './router'
createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')
