<template>
  <div id="home">
    <div class="home_left">
      <div class="sign_in">
        <v-btn
          text
          class="home_left_btn"
          @click="signIn"
        >登 录</v-btn>
      </div>
      <div class="search">
        <v-btn
          text
          class="home_left_btn"
        >搜 索</v-btn>
      </div>
      <div class="play_list">
        <v-btn
          text
          class="home_left_btn"
        >播放列表</v-btn>
      </div>
    </div>
    <div class="home_right">
      <div class="recommend_play_list">
        <div
          v-for="(playItem, playIndex) in recommendPlayList"
          :key="playIndex"
          class="recommend_play_item"
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
        </div>
      </div>
    </div>
  </div>
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
      const res = await this.$api.personalApi.getPersonalizedPlayListTop10()
      if (res.code === 200) {
        this.recommendPlayList = res.result
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  display: flex;
  height: 470px;

  .home_left {
    padding: 50px;
    width: 440px;

    .home_left_btn {
      color: #fff;
      font-size: 18px;
    }

    > div {
      margin-bottom: 10px;

      &.sign_in {
        margin-bottom: 100px;
      }
    }   
  }

  .home_right {
    width: 360px;
    background-color: #fff;

    .recommend_play_list {
      height: 470px;
      overflow-y: auto;

      .recommend_play_item {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        height: 160px;
        overflow: hidden;

        &:hover {
          .big_img {
            width: 110%;
          }
        }

        .big_img {
          width: 100%;
          transition: ease-in-out .4s;
        }
        
        .recommend_play_info {
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          padding: 55px 0 55px 60px;
          width: 100%;
          height: 160px;
          background-color: rgba(255, 255, 255, .6);

          .small_img {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            overflow: hidden;

            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>