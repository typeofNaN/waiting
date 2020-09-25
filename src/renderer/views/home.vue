<template>
  <v-container id="home">
    <v-row>
      <v-col class="home_left">
        <v-row class="sign_in">
          <v-btn
            text
            class="home_left_btn"
            @click="signIn"
          >登 录</v-btn>
        </v-row>
        <v-row class="search">
          <v-btn
            text
            class="home_left_btn"
            @click="search"
          >搜 索</v-btn>
        </v-row>
        <v-row class="play_list">
          <v-btn
            text
            class="home_left_btn"
          >走过秋冬</v-btn>
        </v-row>
        <v-row class="play_list">
          <v-btn
            text
            class="home_left_btn"
            @click="toWarm"
          >温暖依旧</v-btn>
        </v-row>
      </v-col>
      <v-col class="home_right">
        <div class="recommend_play_list">
          <div
            v-for="(playItem, playIndex) in recommendPlayList"
            :key="playIndex"
            class="recommend_play_item"
            @click="toPlayItemDeatil(playItem)"
          >
            <img :src="playItem.picUrl" alt="" class="big_img">
            <div class="recommend_play_info">
              <div class="small_img">
                <img :src="playItem.picUrl" alt="" class="small_img">
              </div>
              <div class="play_info">
                <p class="recommend_play_title">{{ playItem.name }}</p>
                <p class="recommend_play_count">{{ playItem.playCount }} 次 播放</p>
              </div>
            </div>
            <div
              class="goto_icon"
              @click="playCurrentList(playItem)"
              onclick="event.cancelBubble = true"
            >
              <v-icon class="to_go_icon">mdi-play</v-icon>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      recommendPlayList: []
    }
  },
  created () {
    this.getRecommenPlayList()
  },
  methods: {
    signIn () {
      this.$router.push('/account/signin')
    },
    async getRecommenPlayList () {
      const res = await this.$api.personalApi.getPersonalizedPlayList()
      if (res.code === 200) {
        this.recommendPlayList = res.result
      }
    },
    search () {
      this.$router.push('/search')
    },
    toPlayItemDeatil (playItem) {
      this.$router.push(`/playlist/${playItem.id}`)
    },
    playCurrentList (playItem) {
      this.$store.dispatch('playPlayerList', {id: playItem.id})
    },
    toWarm () {
      this.$router.push('/warm')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './home.scss';
</style>
