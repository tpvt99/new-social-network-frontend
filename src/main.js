import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import axios from 'axios'
import { store } from './store/store.js'
import VueI18n from 'vue-i18n'

Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.prototype.$http = axios

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})

