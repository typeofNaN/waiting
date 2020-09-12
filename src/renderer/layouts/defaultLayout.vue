<template>
  <div id="default_layout">
    <v-app>
      <img :src="musicPicUrl" alt="" class="main_bg">
      <div class="default_main">
        <router-view></router-view>
        <player/>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Player from '@/components/public/Player.vue'
export default {
  name: 'defaultLayout',
  components: {
    Player
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
}
</style>