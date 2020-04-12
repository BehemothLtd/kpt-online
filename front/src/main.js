import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from "vue-toasted";
Vue.use(Toasted, {
  type: 'success',
  theme: 'bubble',
  duration: 1000
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
