// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

import vueDebounce from 'vue-debounce'
Vue.use(vueDebounce)

Vue.use(vueDebounce, {
  lock: true
})

// Setting a different event to listen to
Vue.use(vueDebounce, {
  listenTo: 'input'
})

// Listening to multiple events
Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup']
})

// Setting a default timer This is set to '300ms' if not specified
Vue.use(vueDebounce, {
  defaultTime: '700ms'
})

import API from './config';
Vue.prototype.$apiURL = API.apiURL;

import Axios from './axios';
Vue.prototype.$axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
