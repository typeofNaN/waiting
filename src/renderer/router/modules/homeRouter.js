/**
 * @description 主页路由集合
 * @author typeofNaN
 * @time 2020-09-10
 * 使用 () => import() 异步加载路由，减少首屏渲染时间
 */

// 布局
import DefaultLayout from '@/layouts/defaultLayout.vue'

// 首页
const Home = () => import('@/views/home.vue')
// 搜索
const Search = () => import('@/views/search/search.vue')

const HomeRoute = {
  path: '/home',
  name: 'Home',
  component: Home
}

const SearchRoute = {
  path: '/search',
  name: 'Search',
  component: Search
}

const HomeRoutes = {
  path: '/',
  component: DefaultLayout,
  redirect: '/home',
  children: [
    HomeRoute,
    SearchRoute
  ]
}

export default HomeRoutes
