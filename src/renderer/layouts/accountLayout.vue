<template>
  <div id="account_layout">
    <v-app>
      <img :src="musicPicUrl" alt="" class="main_bg">
      <div class="account_main">
        <app-main :show="false"></app-main>
        <div class="account_to_home">
          <span @click="toHome">
            <v-icon class="to_home_icon">mdi-arrow-left</v-icon>
            <span>听音乐，享心情~</span>
          </span>
        </div>
        <div class="sign_box">
          <router-view></router-view>
        </div>
        <div class="copyright">
          &copy; typeofNaN, {{ new Date().getFullYear() }}. 由 Electron 和 日月星辰 强力驱动 | 吾之臂躯 行针步线
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppMain from '@/components/public/AppMain.vue'

export default {
  name: 'AccountLayout',
  components: {
    AppMain
  },
  computed: {
    ...mapGetters([
      'getPlayerSong'
    ]),
    musicPicUrl () {
      try {
        return this.getPlayerSong.al.picUrl || ''
      } catch (e) {
        return ''
      }
    }
  },
  methods: {
    toHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
#account_layout {
  .main_bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  .account_main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, .85);
    z-index: 2;

    .account_to_home {
      padding: 30px 10px 0 10px;
      width: 100%;
      text-align: right;
      font-size: 13px;
      color: #606266;

      span {
        vertical-align: middle;
        cursor: pointer;

        .to_home_icon {
          font-size: 18px;
        }
      }
    }

    .sign_box {
      width: 360px;
      height: 400px;
    }
    
    .copyright {
      padding: 4px 10px;
      text-align: center;
      color: #909399;
      font-size: 12px;
    }
  }
}
</style>