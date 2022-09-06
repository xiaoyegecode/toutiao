import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from '@/plugins'
import '@/assets/fonts/iconfont.css'
import 'amfe-flexible'

Vue.config.productionTip = false
Vue.use(plugins)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
