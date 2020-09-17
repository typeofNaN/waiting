<template>
  <v-container id="search">
    <v-text-field
      v-model="searchText"
      label="Search"
      @keyup.enter="search"
    >
      <v-icon slot="prepend">mdi-magnify</v-icon>
    </v-text-field>
    <v-tabs
      v-model="currentTab"
      class="search_tabs"
      @change="changeTab"
    >
      <v-tab
        v-for="(tab, index) in searchTabList"
        :key="index"
      >{{ tab.text }}</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-container class="data_list">
      <v-list class="album_list">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(albumItem, albumIndex) in albumList"
            :key="albumIndex"
            class="album_item"
            @click="playList(albumItem)"
          >
            <v-list-item-avatar class="album_img">
              <v-img :src="albumItem.picUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="album_content">
              <v-list-item-title class="album_name">{{ albumItem.name }}</v-list-item-title>
              <v-list-item-title class="album_author">{{ albumItem.artist.name }}</v-list-item-title>
              <v-list-item-title class="publish_time">{{ albumItem.publishTime | parseTime }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item class="more">
          <v-btn text>
            更多
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-container>
  </v-container>
</template>

<script>
import { searchTabList } from '@/config/searchTabData'

export default {
  name: 'Search',
  data () {
    return {
      searchText: '陈奕迅',
      currentTab: 1,
      searchTabList: searchTabList,
      albumList: [],

      albumPageNum: 1
    }
  },
  created () {
    this.search()
  },
  methods: {
    async search () {
      if (this.searchText.trim().length === 0) {
        return
      }
      let offset = 1
      if (this.currentTab === 1) {
        offset = this.albumPageNum
      }
      const postData = {
        keywords: this.searchText,
        type: this.searchTabList[this.currentTab].type,
        offset: (offset - 1) * 30
      }
      const res = await this.$api.searchApi.search(postData)
      if (res.code === 200) {
        if (this.currentTab === 1) {
          this.albumList = res.result.albums
        }
      }
    },
    changeTab (val) {
      this.currentTab = val
      this.search()
    },
    playList (albumItem) {
      this.$store.dispatch('playAlbumList', {id: albumItem.id})
    }
  }
}
</script>

<style lang="scss" scoped>
#search {
  padding: 40px 40px 0 40px;
  height: 470px;
  background-color: rgba(255, 255, 255, .7);
  overflow-y: auto;
}
</style>

<style lang="scss">
#search {
  .search_tabs {
    .v-tabs-bar {
      background-color: rgba(0, 0, 0, 0);
    }
  }

  .data_list {
    height: 310px;
    overflow-x: auto;

    .more {
      justify-content: center;
      cursor: pointer;
    }

    .album_list {
      background-color: rgba(255, 255, 255, 0);
      .album_item {
        .album_content {
          display: flex;

          .v-list-item__title {
            &.album_name {
              flex: 1 1 360px;
            }

            &.album_author {
              flex: 1 1 130px;
            }

            &.publish_time {
              flex: 1 1 100px;
            }
          }
        }
      }
    }
  }
}
</style>
