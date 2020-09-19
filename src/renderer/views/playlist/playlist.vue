<template>
  <div id="playlist">
    <div class="playlist_header">
      <div class="cover_img">
        <v-img :src="coverImg"></v-img>
      </div>
      <div class="playlist_info" :style="{ background: infosBgColor }">
        <div class="bro"></div>
        <div class="infos">
          <div class="name">{{ playlistObj.name }}</div><br>
          <div class="author">{{ nickName }}</div><br>
          <div class="played">{{ playedOrBuss }}</div>
        </div>
      </div>
    </div>
    <div class="playlist_main">
      <div class="infos">
        <div class="tags">
          <v-chip
            v-for="(tagItem, tagIndex) in playlistObj.tags"
            :key="tagIndex"
            :color="randomColor()"
            small
            class="ma-2"
          >{{ tagItem }}</v-chip>
        </div>
        <div class="description">简介： {{ playlistObj.description }}</div>
      </div>
      <div class="songs">
        <div
          v-for="(songItem, songIndex) in playlistObj.tracks"
          :key="songIndex"
          class="song_item"
          @click="playSong(songItem)"
        >
          <div class="song_box">
            <div class="play">
              <v-icon class="play_icon">mdi-play</v-icon>
            </div>
            <div class="song_index">{{ songIndex + 1 }}</div>
            <div class="song_name">{{ songItem.name }}</div>
            <div class="song_author">{{ songItem.author }}</div>
            <div class="song_time">{{ songItem.dt | formatDuring }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tools from '@/utils/tools'
// 2409342460
export default {
  name: 'PlayList',
  data () {
    return {
      playlistObj: {}
    }
  },
  computed: {
    coverImg () {
      if (this.$route.path.indexOf('album') >= 0) {
        return this.playlistObj.picUrl
      } else {
        return this.playlistObj.coverImgUrl
      }
    },
    nickName () {
      if (this.$route.path.indexOf('album') >= 0) {
        const arr = []
        this.playlistObj.artists && this.playlistObj.artists.forEach(i => {
          arr.push(i.name)
        })
        return arr.join('/')
      } else {
        return this.playlistObj.creator && this.playlistObj.creator.nickname
      }
    },
    playedOrBuss () {
      if (this.$route.path.indexOf('album') >= 0) {
        return this.playlistObj.company
      } else {
        return this.playlistObj.playCount + ' 次播放'
      }
    },
    infosBgColor () {
      const str = 'linear-gradient(to right, ' + Tools.randomColor() + ', ' + Tools.randomColor() + ')'
      return str
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.$store.commit('SET_LOADING', true)
      const id = this.$route.params.id
      if (this.$route.path.indexOf('album') >= 0) {
        const res = await this.$api.albumApi.getAlbumDetail({id})
        if (res.code === 200) {
          this.playlistObj = res.album
          this.playlistObj.tracks = res.songs.map(i => {
            const authorArr = []
            i.ar.forEach(j => {
              authorArr.push(j.name)
            })
            i.author = authorArr.join('/')
            return i
          })
        }
      } else {
        const res = await this.$api.playlistApi.getPlaylistDetail({id})
        if (res.code === 200) {
          this.playlistObj = res.playlist
          this.playlistObj.tracks = this.playlistObj.tracks.map(i => {
            const authorArr = []
            i.ar.forEach(j => {
              authorArr.push(j.name)
            })
            i.author = authorArr.join('/')
            return i
          })
        }
      }
      this.$store.commit('SET_LOADING', false)
    },
    randomColor () {
      return Tools.randomColor()
    },
    playSong (songItem) {
      this.$store.dispatch('playMusic', songItem.id)
      this.$store.commit('SET_PLAYER_LIST', this.playlistObj.tracks)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './playlist.scss';
</style>
