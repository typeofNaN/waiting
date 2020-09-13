<template>
  <div id="app_header">
    <div class="app_main">
      <div
        class="close no_drag"
        @click="close"
      >
        <v-icon class="app_main_icon">mdi-close</v-icon>
      </div>
      <div
        class="mini no_drag"
        @click="mini"
      >
        <v-icon class="app_main_icon">mdi-window-minimize</v-icon>
      </div>
      <div
        class="prev no_drag"
        @click="prev"
      >
        <v-icon class="app_main_icon">mdi-arrow-left</v-icon>
      </div>
    </div>
    <div
      v-if="show"
      class="drag"
    ></div>
    <div
      v-if="show"
      class="infos"
    >
      <div class="music">
        <v-icon class="info_icon">mdi-music</v-icon>
      </div>
      <div
        class="set"
        @click="showDrawer"
      >
        <v-icon class="info_icon">mdi-dots-vertical</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  props: {
    show: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    close () {
      this.$electron.ipcRenderer.send('close')
    },
    mini () {
      this.$electron.ipcRenderer.send('minimize')
    },
    prev () {
      if (this.$route.name !== 'Home') {
        this.$router.go(-1)
      }
    },
    showDrawer () {
      this.$emit('showDrawer')
    }
  }
}
</script>

<style lang="scss" scoped>
#app_header {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 2px;
  width: 100vw;
  height: 30px;
  z-index: 999;

  .app_main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 64px;
    height: 30px;

    &:hover {
      .app_main_icon {
        display: block;
      }
    }

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: pointer;

      .app_main_icon {
        display: none;
        font-size: 10px;
        color: #303133;
      }
    }

    .close {
      background-color: #F56C6C;
    }

    .mini {
      background-color: #E6A23C;
    }

    .prev {
      background-color: #67C23A;
    }
  }

  .drag {
    width: 660px;
    height: 30px;
    -webkit-app-region: drag;
    z-index: 9;
  }

  .infos {
    display: flex;
    justify-content: space-around;
    align-items: center;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;

      .info_icon {
        font-size: 22px;
        color: #fff;
      }
    }
  }
}
</style>