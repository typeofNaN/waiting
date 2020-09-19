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
    <v-container
      ref="data_list"
      class="data_list"
    >
      <v-list
        v-if="currentTab === 0"
        class="single_list"
      >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(singleItem, singleIndex) in singleList"
            :key="singleIndex"
            class="single_item"
          >
            <v-list-item-content class="single_content">
              <v-list-item-title class="single_name">{{ singleItem.name }}</v-list-item-title>
              <v-list-item-title class="single_author">{{ singleItem.author }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list
        v-else-if="currentTab === 1"
        class="album_list"
      >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(albumItem, albumIndex) in albumList"
            :key="albumIndex"
            class="album_item"
            @click="playAlbum(albumItem)"
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
      </v-list>
      <v-list
        v-else-if="currentTab === 2"
        class="singer_list"
      >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(singerItem, singerIndex) in singerList"
            :key="singerIndex"
            class="singer_item"
            @click="singer(singerItem)"
          >
            <v-list-item-avatar class="singer_img">
              <v-img :src="singerItem.picUrl || singerItem.img1v1Url"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="singer_content">
              <v-list-item-title class="singer_name">{{ singerItem.name }}</v-list-item-title>
              <v-list-item-title class="album_num">{{ singerItem.albumSize }} 个专辑</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list
        v-else-if="currentTab === 3"
        class="play_list"
      >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(playItem, playIndex) in playList"
            :key="playIndex"
            class="play_item"
            @click="playPlaylist(playItem)"
          >
            <v-list-item-avatar class="play_img">
              <v-img :src="playItem.coverImgUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="play_content">
              <v-list-item-title class="play_name">{{ playItem.name }}</v-list-item-title>
              <v-list-item-title class="play_book_count">
                {{ playItem.bookCount }}
                <v-icon class="star_icon">mdi-star</v-icon>
              </v-list-item-title>
              <v-list-item-title class="play_count">{{ playItem.playCount }} 次播放</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-container
        v-else-if="currentTab === 4"
        class="user_list"
      >
        <v-row>
          <v-col
            v-for="(userItem, userIndex) in userList"
            :key="userIndex"
            :cols="2"
            class="user_item"
          >
            <div class="user_img">
              <v-img
                :src="userItem.avatarUrl"
                class="user_avatar"
              ></v-img>
              <v-icon
                v-if="userItem.gender === 1"
                class="sex sex_male"
              >mdi-gender-male</v-icon>
              <v-icon
                v-else-if="userItem.gender === 2"
                class="sex sex_female"
              >mdi-gender-female</v-icon>
            </div>
            <p class="user_name">{{ userItem.nickname }}</p>
          </v-col>
        </v-row>
      </v-container>
      <div
        v-show="pageCount !== 1 && !getLoading"
        class="more"
      >
        <v-pagination
          v-model="pageNum"
          :length="pageCount"
          :total-visible="7"
          circle
          @input="pageNumChange"
        ></v-pagination>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { searchTabList } from '@/config/searchTabData'

export default {
  name: 'Search',
  data () {
    return {
      searchText: '陈奕迅',
      currentTab: 0,
      searchTabList: searchTabList,
      pageNum: 1,
      pageCount: 1,
      singleList: [],
      albumList: [],
      singerList: [],
      playList: [],
      userList: []
    }
  },
  computed: {
    ...mapGetters(['getLoading'])
  },
  created () {
    this.search()
  },
  methods: {
    async search () {
      if (this.searchText.trim().length === 0) {
        return
      }
      this.$store.commit('SET_LOADING', true)
      let offset = this.pageNum

      const postData = {
        keywords: this.searchText,
        type: this.searchTabList[this.currentTab].type,
        offset: (offset - 1) * 30
      }
      const res = await this.$api.searchApi.search(postData)
      if (res.code === 200) {
        if (this.currentTab === 0) {
          let dt = res.result.songs
          dt = dt.map(i => {
            const arr = []
            i.artists.forEach(j => {
              arr.push(j.name)
            })
            i.author = arr.join('/')
            return i
          })
          this.singleList = dt
          this.pageCount = this.countSize(res.result.songCount)
        } else if (this.currentTab === 1) {
          this.albumList = res.result.albums
          this.pageCount = this.countSize(res.result.albumCount)
        } else if (this.currentTab === 2) {
          this.singerList = res.result.artists
          this.pageCount = this.countSize(res.result.artistCount)
        } else if (this.currentTab === 3) {
          this.playList = res.result.playlists
          this.pageCount = this.countSize(res.result.playlistCount)
        } else if (this.currentTab === 4) {
          this.userList = res.result.userprofiles
          this.pageCount = this.countSize(res.result.userprofileCount)
        }

        this.$refs.data_list.scrollTop = 0
        this.$store.commit('SET_LOADING', false)
      }
    },
    changeTab (val) {
      this.currentTab = val
      this.pageNum = 1
      this.search()
    },
    playAlbum (albumItem) {
      // this.$store.dispatch('playAlbumList', {id: albumItem.id})
      this.$router.push(`/album/${albumItem.id}`)
    },
    playPlaylist (playItem) {
      // this.$store.dispatch('playPlayerList', {id: playItem.id})
      this.$router.push(`/playlist/${playItem.id}`)
    },
    pageNumChange () {
      this.search()
    },
    countSize (num) {
      if (num % 30 === 0) {
        return (~~(num / 30))
      } else {
        return (~~(num / 30) + 1)
      }
    }
  }
}
</script>

<style lang="scss">
@import './search.scss';
</style>
