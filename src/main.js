import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'vant';
import getVant from '@/plugins/index';
const app=createApp(App)
app.use(Button);
getVant(app)
app.use(store)
app.use(router)
app.mount('#app')
