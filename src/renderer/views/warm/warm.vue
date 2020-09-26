<template>
  <div id="warm">
    <v-icon
      class="refresh_btn"
      color="primary"
      @click="refresh"
    >mdi-refresh</v-icon>
    <div class="warm_box">
      <p class="content">{{ warmObj.content }}</p>
      <p class="resource"><span></span> 《{{ warmObj.song }}》</p>
    </div>
  </div>
</template>

<script>
import { warmComment } from '@/config/warmComment'

export default {
  name: 'Warm',
  data () {
    return {
      warmObj: {}
    }
  },
  created () {
    this.setWarmData()
  },
  methods: {
    refresh () {
      this.setWarmData()
    },
    setWarmData () {
      this.warmObj = this.getRandomArrayElements(warmComment)
    },
    getRandomArrayElements (arr) {
      return arr[~~(Math.random() * arr.length)]
    }
  }
}
</script>

<style lang="scss" scoped>
#warm {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 470px;
  background-color: rgba(0, 0, 0, .6);

  .refresh_btn {
    position: absolute;
    top: 60px;
    right: 40px;
    cursor: pointer;
  }

  .warm_box {
    width: 360px;
    color: #ea4c89;
    font-size: 13px;
    font-style: italic;

    p.resource {
      text-align: right;

      span {
        display: inline-block;
        width: 40px;
        height: 1px;
        background-color: #ea4c89;
        vertical-align: middle;
      }
    }
  }
}
</style>
