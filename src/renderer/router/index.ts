import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

import HomeRouter from './modules/homeRouter'
import AccountRouter from './modules/accountRouter'

Vue.use(Router)

const routes: Array<RouteConfig> = [
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
