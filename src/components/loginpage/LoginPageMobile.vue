<template>
  <div class="login">
    <div class="login-div">
      <div>
        <h1>Lifelead</h1>
      </div>
      <div>
        <transition name="slide" mode="out-in" appear>
          <user-login v-if="show"></user-login>
          <user-register v-else></user-register>
        </transition>
      </div>
      <div class="login-footer">
        <div @click="handleView">
          <h3 v-if="show">Đăng ký tài khoản</h3>
          <h3 v-else>Trở lại trang đăng nhập</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputLogin from './LoginFormMobile.vue'
import InputRegister from './RegisterFormMobile.vue'
export default {
  data () {
    return {
      show: true
    }
  },
  components: {
    userLogin: InputLogin,
    userRegister: InputRegister
  },
  methods: {
    handleView () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../static/scss/loginpage/loginpage.scss';
</style>
