<template>
  <div id="default_layout">
    <v-app>
      <img :src="musicPicUrl" alt="" class="main_bg">
      <div class="default_main">
        <app-main @showDrawer="showDrawer"></app-main>
        <router-view></router-view>
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
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppMain from '@/components/public/AppMain.vue'
import Player from '@/components/public/Player.vue'
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
    Player
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
#default_layout {
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
#default_layout {
  .default_main {
    .left_drawer {
      .v-navigation-drawer__content {
        padding: 80px 40px;
      }
    }
  }
}
</style>
