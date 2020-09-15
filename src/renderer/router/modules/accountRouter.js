/**
 * @description 主页路由集合
 * @author typeofNaN
 * @time 2020-09-10
 * 使用 () => import() 异步加载路由，减少首屏渲染时间
 */

// 首页
const Signin = () => import('@/views/user/signin.vue')

const SigninRoute = {
  path: '/account/signin',
  name: 'Signin',
  component: Signin
}

export {
  SigninRoute
}
