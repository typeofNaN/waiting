<template>
  <div id="lrc">
    <div class="song_info">
      <v-img
        :src="musicPicUrl"
        class="song_cover"
      ></v-img>
      <div class="infos">
        <div class="comment">COMMENT</div>
        <div class="cover">COVER</div>
        <div class="title">
          <p class="name">{{ name }}</p>
          <v-divider class="line"></v-divider>
          <p class="author">{{ ar_name }}</p>
        </div>
      </div>
    </div>
    <div class="song_lyric">
      <v-img
        :src="musicPicUrl"
        class="song_cover"
      ></v-img>
      <div class="lyric">
        Nothing...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lrc',
  data () {
    return {
      songObj: {},
      lrc: {}
    }
  },
  computed: {
    songId () {
      return this.$route.params.id
    },
    musicPicUrl () {
      try {
        return this.songObj.al.picUrl || ''
      } catch (e) {
        return ''
      }
    },
    name () {
      try {
        return this.songObj.name || ''
      } catch (e) {
        return ''
      }
    },
    ar_name () {
      try {
        const authorArr = []
        const author = this.songObj.ar

        if (author && author.length > 0) {
          author.forEach(i => {
            authorArr.push(i.name)
          })
        }

        return authorArr.join(' / ')
      } catch (e) {
        return false
      }
    }
  },
  created () {
    this.getSongDetail()
    this.getLrc()
  },
  methods: {
    async getSongDetail () {
      const res = await this.$api.songApi.getSongDetailById(this.songId)
      if (res.code === 200) {
        this.songObj = res.songs[0]
      }
    },
    async getLrc () {
      const res = await this.$api.lyricApi.getSongLyric(this.songId)
      if (res.code === 200) {
        // this.songObj = res.songs[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './lrc.scss';
</style>
