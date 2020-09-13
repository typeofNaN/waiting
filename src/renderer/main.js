import Vue from 'vue'

import Api from './services'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as filters from '@/filters'
import './assets/style/style.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.prototype.$api = Api
Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  vuetify,
  template: '<App/>'
}).$mount('#app')
