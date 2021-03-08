import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入阿里矢量图标和取消默认css
import '@/assets/css/iconfont.css'
import '@/assets/css/reset.css'

createApp(App).use(store).use(router).mount('#app')
