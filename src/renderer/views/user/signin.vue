<template>
  <div id="signin">
    <div class="account_to_home">
      <span @click="toHome">
        <v-icon class="to_home_icon">mdi-arrow-left</v-icon>
        <span>听音乐，享心情~</span>
      </span>
    </div>
    <div class="sign_box">
      <h1 class="signin_title">Sign in</h1>
      <p>开启您的专属私人音乐~</p>
      <v-form
        ref="form"
        v-model="signin"
        lazy-validation
      >
        <v-text-field
          v-model="signinForm.account"
          label="账号"
          required
        ></v-text-field>
        <v-text-field
          v-model="signinForm.password"
          label="密码"
          required
          type="password"
        ></v-text-field>
        <v-btn
          block
          color="primary"
          class="signin_btn"
          @click="signIn"
        >登 录</v-btn>
      </v-form>
    </div>
    <div class="copyright">
      &copy; typeofNaN, {{ new Date().getFullYear() }}. 由 Electron 和 日月星辰 强力驱动 | 吾之臂躯 行针步线
    </div>
  </div>
</template>

<script>
// account: 'vipfenwyy@163.com'
// password: 'music666'

export default {
  name: 'Signin',
  data () {
    return {
      signin: true,
      signinForm: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
    signIn () {
      this.$store.dispatch('login', {
        signInData: this.signinForm
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './signin.scss';
</style>
