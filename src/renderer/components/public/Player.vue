<template>
  <div id="player">
    <div class="player_left">
      <div class="music_img">
        <img :src="musicPicUrl" alt="">
      </div>
      <div class="music_info">
        <p class="music_title">{{ musicTitle }}</p>
        <p class="music_author">{{ musicAuthors }}</p>
      </div>
    </div>
    <div class="player_right">
      <span>歌词</span>
      <span>72 条评论</span>
      <v-icon class="player_icon">mdi-heart-outline</v-icon>
      <v-icon class="player_icon">mdi-cached</v-icon>
      <v-icon class="player_icon">mdi-skip-previous</v-icon>
      <v-icon class="player_icon">mdi-play</v-icon>
      <v-icon class="player_icon">mdi-skip-next</v-icon>
      <v-icon class="player_icon">mdi-volume-high</v-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Player',
  created () {
    this.getSong()
  },
  computed: {
    ...mapGetters([
      'getCurrentSong'
    ]),
    musicPicUrl () {
      try {
        return this.getCurrentSong.al.picUrl || ''
      } catch (e) {
        return ''
      }
    },
    musicTitle () {
      return this.getCurrentSong.name
    },
    musicAuthors () {
      const authorArr = []
      const author = this.getCurrentSong.ar

      if (author && author.length > 0) {
        author.forEach(i => {
          authorArr.push(i.name)
        })
      }

      return authorArr.join(' / ')
    }
  },
  methods: {
    getSong () {
      this.$store.dispatch('setCurrentSong')
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
        margin-bottom: 2px;
        font-size: 14px;
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
    }

    .player_icon {
      color: #303133;
    }
  }
}
</style>