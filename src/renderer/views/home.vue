<template>
  <div id="home">
    <!-- <v-app light> -->
      <v-btn
        small
        @click="login"
      >Normal</v-btn>
    <!-- </v-app> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VBtn } from 'vuetify/lib'

@Component({
  name: 'Home',
  components: {
    VBtn
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