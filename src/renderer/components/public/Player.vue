<template>
  <div
    v-show="showInFooter"
    id="player"
  >
    <div class="time_slider">
      <v-slider
        v-model="play_time"
        :min="0"
        :max="getPlayerSong.dt / 1000"
        @click="playTimeChange(play_time)"
        @end="playTimeChange"
      ></v-slider>
    </div>
    <div class="player_left">
      <div class="music_img">
        <img :src="cover" alt="">
        <audio
          v-if="play_url"
          v-show="false"
          ref="audio"
          :src="play_url.url"
          preload="none"
        />
      </div>
      <div class="music_info">
        <p class="music_title">{{ name }}</p>
        <p class="music_author">{{ ar_name }}</p>
      </div>
    </div>
    <div class="player_right">
      <span>歌词</span>
      <span>评论</span>
      <v-icon
        v-show="play_type === 0"
        class="player_icon"
        @click="changePlayType(1)"
      >mdi-repeat-once</v-icon>
      <v-icon
        v-show="play_type === 1"
        class="player_icon"
        @click="changePlayType(2)"
      >mdi-repeat</v-icon>
      <v-icon
        v-show="play_type === 2"
        class="player_icon"
        @click="changePlayType(0)"
      >mdi-shuffle</v-icon>
      <v-icon
        class="player_icon"
        @click="playBefore"
        :disabled="!before_song"
      >mdi-skip-previous</v-icon>
      <v-icon
        v-show="!getPlayerIsPlay"
        class="player_icon"
        @click="playClick"
      >mdi-play</v-icon>
      <v-icon
        v-show="getPlayerIsPlay"
        class="player_icon"
        @click="playClick"
        style="transform: rotate(90deg);"
      >mdi-equal</v-icon>
      <v-icon
        class="player_icon"
        @click="playAfter"
        :disabled="!after_song"
      >mdi-skip-next</v-icon>
      <v-menu
        offset-y
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-if="volume === 0"
            class="player_icon"
            v-bind="attrs"
            v-on="on"
          >mdi-volume-mute</v-icon>
          <v-icon
            v-else-if="volume <= 30"
            class="player_icon"
            v-bind="attrs"
            v-on="on"
          >mdi-volume-low</v-icon>
          <v-icon
            v-else-if="volume <= 70"
            class="player_icon"
            v-bind="attrs"
            v-on="on"
          >mdi-volume-medium</v-icon>
          <v-icon
            v-else
            class="player_icon"
            v-bind="attrs"
            v-on="on"
          >mdi-volume-high</v-icon>
        </template>
        <v-icon
          class="player_icon"
          @click="setVolume(100)"
        >mdi-volume-high</v-icon>
        <v-slider
          v-model="volume"
          :min="0"
          :max="100"
          vertical
          @click="setVolume(volume)"
          @end="volumeChange"
        ></v-slider>
        <v-icon
          class="player_icon"
          @click="setVolume(0)"
        >mdi-volume-mute</v-icon>
      </v-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Player',
  data () {
    return {
      audio: {},
      play_time: 0,
      max_time: 0,
      interval: null,
      play_type: 1, // 播放次序 0单曲循环 1列表循环 2随机播放
      volume: 100
    }
  },
  watch: {
    getPlayerIsPlay (val) {
      try {
        this.$nextTick(() => {
          this.audio = this.$refs['audio']
          if (val) {
            this.audio.play()
            this.max_time = this.audio.duration
            this.getPlayTime()
            this.audio.addEventListener('ended', () => {
              this.playEnded()
            })
          } else {
            this.audio.pause()
            clearInterval(this.interval)
          }
        })
      } catch (e) {
        console.log('play error')
      }
    },
    getPlayerCurrentTime (val) {
      this.play_time = val
    },
    play_url (url) {
      if (!url) {
        this.playAfter()
      }
    }
  },
  created () {
    // this.getSong()
    // this.getPlayList()
  },
  computed: {
    ...mapGetters([
      'getPlayerList',
      'getPlayerSong',
      'getPlayerMusicUrls',
      'getPlayerIsPlay',
      'getPlayerCurrentTime'
    ]),
    cover () {
      try {
        return this.getPlayerSong.al.picUrl
      } catch (e) {
        return 'http://p2.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg'
      }
    },
    name () {
      try {
        return this.getPlayerSong.name || ''
      } catch (e) {
        return ''
      }
    },
    ar_name () {
      try {
        const authorArr = []
        const author = this.getPlayerSong.ar

        if (author && author.length > 0) {
          author.forEach(i => {
            authorArr.push(i.name)
          })
        }

        return authorArr.join(' / ')
      } catch (e) {
        return false
      }
    },
    play_url () {
      return this.getPlayerMusicUrls[0] || false
    },
    before_song () {
      let sIndex = -1
      this.getPlayerList.map((item, index) => {
        if (this.getPlayerSong.id === item.id && index > 0) {
          sIndex = index - 1
        }
      })
      return sIndex >= 0 ? this.getPlayerList[sIndex] : false
    },
    after_song () {
      let sIndex = -1
      this.getPlayerList.map((item, index) => {
        if (this.getPlayerSong.id === item.id && index < this.getPlayerList.length - 1) {
          sIndex = index + 1
        }
      })
      return sIndex >= 0 ? this.getPlayerList[sIndex] : false
    },
    showInFooter () {
      return this.$route.path !== '/account/signin'
    }
  },
  methods: {
    getSong () {
      // this.$store.dispatch('playMusic', 450612833)
      this.$store.dispatch('playMusic', 65538)
    },
    getPlayList () {
      this.$store.dispatch('playPlayerList', {id: 924680166})
    },
    // 改变播放模式
    changePlayType (val) {
      this.play_type = val
    },
    // 播放/暂停按钮点击
    playClick () {
      this.$store.commit('SET_PLAYER_DATA', {playerIsPlay: !this.getPlayerIsPlay})
    },
    // 获取当前已播放时间
    getPlayTime () {
      this.interval = setInterval(() => {
        this.$store.commit('SET_PLAYER_DATA', {playerCurrentTime: this.audio.currentTime})
      }, 1000)
    },
    // 改变播放时间
    playTimeChange (val) {
      this.audio.currentTime = val
      this.$store.commit('SET_PLAYER_DATA', {playerCurrentTime: val})
    },
    // 播放结束事件
    playEnded () {
      switch (this.play_type) {
        case 0:
          this.rePlay()
          break
        case 1:
          this.playAfter()
          break
      }
    },
    // 重新播放
    rePlay () {
      this.$store.commit('SET_PLAYER_DATA', {playerIsPlay: false, playerCurrentTime: 0})
      setTimeout(() => {
        this.$store.commit('SET_PLAYER_DATA', {playerIsPlay: true})
      }, 1000)
    },
    playBefore () {
      if (this.before_song) {
        this.$store.dispatch('playMusic', this.before_song.id)
      }
    },
    playAfter () {
      if (this.after_song) {
        this.$store.dispatch('playMusic', this.after_song.id)
      }
    },
    // 弹出播放列表
    showPlaylist () {
      this.$bus.$emit('showPlaylist')
    },
    setVolume (val) {
      if (this.volume === 0) {
        this.volume = 100
        this.$refs.audio.volume = 1
      } else {
        this.volume = val
        this.$refs.audio.volume = this.volume / 100
      }
    },
    volumeChange (val) {
      this.setVolume(val)
    }
  }
}
</script>

<style lang="scss" scoped>
#player {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  padding: 5px 10px;
  width: 100%;
  height: 50px;
  background-color: rgba(255, 255, 255, .7);

  > div {
    width: 50%;
  }

  .time_slider {
    position: fixed;
    bottom: 32px;
    left: 0;
    width: 100%;
  }

  .player_left {
    display: flex;

    .music_img {
      padding: 4px 0;
      width: 60px;

      img {
        width: 32px;
        height: 32px;
      }
    }

    .music_info {
      line-height: 1.5;

      .music_title {
        width: 300px;
        margin-bottom: 2px;
        font-size: 14px;
        overflow: hidden;
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
      }

      .music_author {
        font-size: 10px;
      }
    }
  }
  .player_right {
    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      padding: 0 4px;
      color: #303133;
      font-size: 11px;
      border-top: 1px solid #303133;
      border-bottom: 1px solid #303133;
      cursor: pointer;
    }

    .player_icon {
      color: #303133;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
#player {
  .time_slider {
    .v-input__slot {
      margin-bottom: 0;

      .v-slider--horizontal {
        margin: 0;
        min-height: 8px;
        cursor: pointer;
      }
    }
  }
}
</style>