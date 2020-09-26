<template>
  <div id="app">
    <v-app>
      <img :src="musicPicUrl" alt="" class="main_bg">
      <div class="default_main">
        <app-main @showDrawer="showDrawer"></app-main>
        <transition name="fade">
          <keep-alive :include="['Home', 'Search']">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <player/>
      </div>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        class="left_drawer"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in drawerList"
            :key="index"
            link
            @click="toLink(item)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <loading v-show="getLoading"></loading>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppMain from '@/components/public/AppMain.vue'
import Player from '@/components/public/Player.vue'
import Loading from '@/components/public/Loading.vue'
import { drawerList } from '@/config/leftDrawer'

export default {
  name: 'defaultLayout',
  data () {
    return {
      drawer: false,
      drawerList: drawerList
    }
  },
  components: {
    AppMain,
    Player,
    Loading
  },
  computed: {
    ...mapGetters([
      'getPlayerSong',
      'getLoading'
    ]),
    musicPicUrl () {
      try {
        return this.getPlayerSong.al.picUrl || 'http://p2.music.126.net/dqzW8nWXBQaoyTlPOHVc-A==/109951165338655031.jpg'
      } catch (e) {
        return 'http://p2.music.126.net/dqzW8nWXBQaoyTlPOHVc-A==/109951165338655031.jpg'
      }
    }
  },
  methods: {
    showDrawer () {
      this.drawer = !this.drawer
    },
    toLink (item) {
      const path = this.$route.path

      if (path !== item.link) {
        this.$router.push(item.link)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  .main_bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .default_main {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .2);
  }

  .left_drawer {
    padding: 80px 40px;
  }
}
</style>

<style lang="scss">
#app {
  .default_main {
    .left_drawer {
      .v-navigation-drawer__content {
        padding: 80px 40px;
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
