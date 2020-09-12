<template>
  <div id="signin">
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
  }
}
</script>

<style lang="scss" scoped>
#signin {
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
</style>