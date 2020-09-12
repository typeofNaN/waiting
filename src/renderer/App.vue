<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VApp } from 'vuetify/lib'

@Component({
  name: 'Home',
  components: {
    VApp
  }
})
export default class Home extends Vue {
  created () {
    console.log(this.$route)
  }
  login () {
    this.$router.push('/account/signin')
  }
}
</script>