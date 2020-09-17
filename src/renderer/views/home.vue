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
          >播放列表</v-btn>
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
      const res = await this.$api.personalApi.getPersonalizedPlayListTop10()
      if (res.code === 200) {
        this.recommendPlayList = res.result
      }
    },
    search () {
      this.$router.push('/search')
    },
    toPlayItemDeatil (playItem) {
      console.log(playItem)
    },
    playCurrentList (playItem) {
      this.$store.dispatch('playplayerlist', {id: playItem.id})
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  padding: 0;
  height: 470px;

  .home_left {
    padding: 80px 50px;
    width: 440px;

    .home_left_btn {
      color: #fff;
      font-size: 18px;
    }

    > div {
      margin-bottom: 10px;

      &.sign_in {
        margin-bottom: 80px;
      }
    }   
  }

  .home_right {
    padding: 0;
    width: 360px;

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
        cursor: pointer;

        &:hover {
          .big_img {
            width: 110%;
          }

          .goto_icon {
            left: 0;
          }
        }

        .big_img {
          width: 100%;
          transition: ease-in-out .2s;
        }
        
        .recommend_play_info {
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          padding: 55px 0 55px 60px;
          width: 100%;
          height: 160px;
          background-color: rgba(255, 255, 255, .5);

          .small_img {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            overflow: hidden;
            box-shadow: 0 0 6px 6px rgba(255, 255, 0, .2);

            img {
              width: 100%;
            }
          }

          .play_info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 20px;

            .recommend_play_title {
              width: 200px;
              margin-bottom: 4px;
              font-size: 13px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .recommend_play_count {
              margin-bottom: 0;
              font-size: 11px;
            }
          }
        }

        .goto_icon {
          position: absolute;
          top: 65px;
          left: -30px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background-color: #67C23A;
          border-radius: 50%;
          transition: ease-in-out .2s;

          .to_go_icon {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>