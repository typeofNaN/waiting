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
        >登 录</v-btn>
      </v-form>
    </div>
    <div class="copyright">
      &copy; typeofNaN, {{ new Date().getFullYear() }}. 由 Electron 和 日月星辰 强力驱动 | 吾之臂躯 行针步线
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style lang="scss" scoped>
#signin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, .85);
  z-index: 2;

  .account_to_home {
    padding: 30px 10px 0 10px;
    width: 100%;
    text-align: right;
    font-size: 13px;
    color: #606266;

    span {
      vertical-align: middle;
      cursor: pointer;

      .to_home_icon {
        font-size: 18px;
      }
    }
  }

  .sign_box {
    width: 360px;
    height: 400px;

    .signin_title {
      margin-bottom: 40px;
      text-align: center;
      font-family: 'HelveticaNeue-UltraLight';
      font-weight: 400;
      font-size: 44px;
      letter-spacing: 2px;
      word-spacing: 6px;
      color: #ea4c89;
    }

    p {
      margin-bottom: 30px;
      text-align: center;
      color: #909399;
      font-size: 14px;
    }

    .signin_btn {
      margin-top: 20px;
    }
  }

  .copyright {
    padding: 4px 10px;
    text-align: center;
    color: #909399;
    font-size: 12px;
  }
}
</style>