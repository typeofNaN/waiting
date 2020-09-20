import Vue from 'vue'
import Router from 'vue-router'

import { HomeRoute, SearchRoute, PlaylistRoute, AlbumRoute, CoverRoute, LrcRoute, SongCommentRoute, PlaylistCommentRoute } from './modules/homeRouter'
import { SigninRoute } from './modules/accountRouter'

Vue.use(Router)

const routes = [
  HomeRoute,
  SearchRoute,
  PlaylistRoute,
  AlbumRoute,
  CoverRoute,
  LrcRoute,
  SongCommentRoute,
  PlaylistCommentRoute,
  SigninRoute,
  {
    path: '*',
    redirect: '/'
  }
]

export default new Router({
  routes
})
