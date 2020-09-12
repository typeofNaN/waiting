/**
 * @description 主页路由集合
 * @author typeofNaN
 * @time 2020-09-10
 * 使用 () => import() 异步加载路由，减少首屏渲染时间
 */

import { RouteConfig } from 'vue-router'

// 布局
import DefaultLayout from '@/layouts/defaultLayout.vue'

// 首页
// const Home = () => import('@/views/home.vue')
const Home = () => import('@/views/home.vue')
const HomeRoute: RouteConfig = {
  path: '/home',
  name: 'Home',
  component: Home
}

const HomeRoutes: RouteConfig = {
  path: '/',
  component: DefaultLayout,
  redirect: '/home',
  children: [
    HomeRoute
  ]
}

export default HomeRoutes
