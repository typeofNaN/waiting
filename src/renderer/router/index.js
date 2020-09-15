import Vue from 'vue'
import Router from 'vue-router'

import { HomeRoute, SearchRoute } from './modules/homeRouter'
import { SigninRoute } from './modules/accountRouter'

Vue.use(Router)

const routes = [
  HomeRoute,
  SearchRoute,
  SigninRoute,
  {
    path: '*',
    redirect: '/'
  }
]

export default new Router({
  routes
})
