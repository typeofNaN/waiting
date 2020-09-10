import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

import HomeRouter from './modules/homeRouter'

Vue.use(Router)

const routes: Array<RouteConfig> = [
  HomeRouter
]

export default new Router({
  routes
})
