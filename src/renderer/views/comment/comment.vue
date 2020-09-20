<template>
  <div id="comment">
    <div class="song_info">
      <v-img
        :src="musicPicUrl"
        class="song_cover"
      ></v-img>
      <div class="infos">
        <div class="lyric">LYRIC</div>
        <div class="cover">COVER</div>
        <div class="title">
          <p class="name">{{ name }}</p>
          <v-divider class="line"></v-divider>
          <p class="author">{{ ar_name }}</p>
        </div>
      </div>
    </div>
    <div class="comments">
      <v-tabs
        v-model="currentTab"
        class="comment_tabs"
        @change="changeTab"
      >
        <v-tab>热门评论</v-tab>
        <v-tab>最新评论</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-container
        ref="comment_list"
        class="comment_list"
      >
        <v-list
          v-show="currentTab === 0"
          class="hot_comment_list"
        >
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(hotItem, hotIndex) in hotComments"
              :key="hotIndex"
              class="hot_item"
            >
              <v-list-item-avatar class="avatar">
                <v-img :src="hotItem.user.avatarUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="hot_content">
                {{ hotItem.content }}
                <p>{{ hotItem.time |  timeAgo}} 前</p>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-list
          v-show="currentTab === 1"
          class="new_comment_list"
        >
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(newItem, newIndex) in newComments"
              :key="newIndex"
              class="new_item"
            >
              <v-list-item-avatar class="avatar">
                <v-img :src="newItem.user.avatarUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="new_content">
                {{ newItem.content }}
                <p>{{ newItem.time |  timeAgo}} 前</p>
              </v-list-item-content>
            </v-list-item>
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
          </v-list-item-group>
        </v-list>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Comment',
  data () {
    return {
      songObj: {},
      currentTab: 0,
      pageNum: 1,
      pageCount: 1,
      hotComments: [],
      newComments: []
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
    id () {
      return this.$route.params.id
    },
    musicPicUrl () {
      try {
        return this.songObj.al.picUrl || ''
      } catch (e) {
        return ''
      }
    },
    name () {
      try {
        return this.songObj.name || ''
      } catch (e) {
        return ''
      }
    },
    ar_name () {
      try {
        const authorArr = []
        const author = this.songObj.ar

        if (author && author.length > 0) {
          author.forEach(i => {
            authorArr.push(i.name)
          })
        }

        return authorArr.join(' / ')
      } catch (e) {
        return false
      }
    },
    commentType () {
      const path = this.$route.path
      if (path.indexOf('song') >= 0) {
        return 0
      } else if (path.indexOf('playlist') >= 0) {
        return 2
      }
    }
  },
  created () {
    this.getSongDetail()
    this.getComment()
  },
  methods: {
    async getSongDetail () {
      const res = await this.$api.songApi.getSongDetailById(this.id)
      if (res.code === 200) {
        this.songObj = res.songs[0]
      }
    },
    async getComment () {
      this.$store.commit('SET_LOADING', true)
      const id = this.id
      const postData = {
        id,
        type: this.commentType,
        offset: (this.pageNum - 1) * 20
      }

      const res = await this.$api.commentApi.getMusicComment(postData)
      if (res.code === 200) {
        this.hotComments = res.hotComments
        this.newComments = res.comments
        this.pageCount = this.countSize(res.total)
      }
      this.$refs.comment_list.scrollTop = 0
      this.$store.commit('SET_LOADING', false)
    },
    changeTab (val) {
      this.currentTab = val
    },
    pageNumChange () {
      this.getComment()
    },
    countSize (num) {
      if (num % 20 === 0) {
        return (~~(num / 20))
      } else {
        return (~~(num / 20) + 1)
      }
    }
  }
}
</script>

<style lang="scss">
@import './comment.scss';
</style>
