import Vue from 'vue'
import Router from 'vue-router'

import HomeRouter from './modules/homeRouter'
import AccountRouter from './modules/accountRouter'

Vue.use(Router)

const routes = [
  HomeRouter,
  AccountRouter,
  {
    path: '*',
    redirect: '/'
  }
]

export default new Router({
  routes
})
