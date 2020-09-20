<template>
  <v-container id="cover">
    <v-img
      :src="musicPicUrl"
      class="cover_img"
    ></v-img>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cover',
  computed: {
    ...mapGetters(['getPlayerSong']),
    musicPicUrl () {
      try {
        return this.getPlayerSong.al.picUrl || ''
      } catch (e) {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#cover {
  padding-top: 100px;
  text-align: center;

  .cover_img {
    margin: 0 auto;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    box-shadow: 0px 0px 100px 30px rgba(128, 0, 128, .5);
    animation: turn 36s linear infinite;

    @keyframes turn{
      0% {
        -webkit-transform: rotate(0deg);
      }
      25% {
        -webkit-transform: rotate(90deg);
      }
      50% {
        -webkit-transform: rotate(180deg);
      }
      75% {
        -webkit-transform: rotate(270deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
  }
}
</style>
