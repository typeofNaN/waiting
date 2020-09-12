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

<script>
export default {
  name: 'Home',
  created () {
    console.log(this.$route)
  },
  methods: {
    login () {
      this.$router.push('/account/signin')
    }
  }
}
</script>