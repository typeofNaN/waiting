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
// cover
const Cover = () => import('@/views/cover/cover.vue')
// 歌词
const Lrc = () => import('@/views/lrc/lrc.vue')
// 歌曲评论
const SongComment = () => import('@/views/comment/comment.vue')
// 歌单评论
const PlaylistComment = () => import('@/views/comment/comment.vue')

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

const CoverRoute = {
  path: '/cover',
  name: 'Cover',
  component: Cover
}

const LrcRoute = {
  path: '/lrc/:id',
  name: 'Lrc',
  component: Lrc
}

const SongCommentRoute = {
  path: '/song-comment/:id',
  name: 'SongComment',
  component: SongComment
}

const PlaylistCommentRoute = {
  path: '/playlist-comment/:id',
  name: 'PlaylistComment',
  component: PlaylistComment
}

export {
  HomeRoute,
  SearchRoute,
  PlaylistRoute,
  AlbumRoute,
  CoverRoute,
  LrcRoute,
  SongCommentRoute,
  PlaylistCommentRoute
}
