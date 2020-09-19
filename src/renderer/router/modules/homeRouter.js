/**
 * @description 主页路由集合
 * @author typeofNaN
 * @time 2020-09-10
 * 使用 () => import() 异步加载路由，减少首屏渲染时间
 */

// 首页
const Home = () => import('@/views/home.vue')
// 搜索
const Search = () => import('@/views/search/search.vue')
// 歌单详情
const Playlist = () => import('@/views/playlist/playlist.vue')
// 专辑详情
const Album = () => import('@/views/playlist/playlist.vue')

const HomeRoute = {
  path: '/',
  name: 'Home',
  component: Home
}

const SearchRoute = {
  path: '/search',
  name: 'Search',
  component: Search
}

const PlaylistRoute = {
  path: '/playlist/:id',
  name: 'Playlist',
  component: Playlist
}

const AlbumRoute = {
  path: '/album/:id',
  name: 'Album',
  component: Album
}

export {
  HomeRoute,
  SearchRoute,
  PlaylistRoute,
  AlbumRoute
}
