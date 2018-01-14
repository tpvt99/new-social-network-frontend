<template>
  <div>
    <div class="background-div row">
      <div class="intro">
        <h2>Kết nối và chia sẻ</h2>
        <img src="/static/image/loginpage/world.png">
        <img src="/static/image/loginpage/world1.png">
      </div>
      <div class="content">
        <div>
          <h2 class="header">
            <span style='color:red;'>L</span><span style="color:green">i</span><span style="color:blue">f</span><span style="color:brown">e</span><span style="color:orange">l</span><span style="color:pink">e</span><span style="color:purple">a</span><span>d</span>
          </h2>
        </div>
        <div class="form">
          <div>
            <transition name="fade" appear mode="out-in">
              <login-form v-if="show"></login-form>
              <register-form v-else></register-form>
            </transition>
          </div>
        </div>
        <div class="footer">
          <div>
            <transition name="fade" mode="out-in" appear>
              <h4 v-if="show">
                <span style="color:#888;">Chưa có tài khoản?</span>
                <a @click="handleFn" href="#" v-if="show">Nhấp vô đây để đăng kí</a>
              </h4>
              <h4 v-else>
                <a href="#" @click="handleFn">Trở về trang đăng nhập</a>
              </h4>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginFormDesktop from './LoginFormDesktop.vue'
import RegisterFormDesktop from './RegisterFormDesktop.vue'
export default {
  data () {
    return {
      active: true,
      show: true
    }
  },
  components: {
    loginForm: LoginFormDesktop,
    registerForm: RegisterFormDesktop
  },
  methods: {
    handleFn () {
      this.show = !this.show
    },
    randomNum () {
      var x = this.quotes.length
      var rand = Math.floor((Math.random()) * x)
      return rand
    }
  },
  created () {
    document.body.style.backgroundColor = '#fff'
  }
}
</script>

<style lang="scss">
@import '../../../static/scss/loginpage/loginpagedesktop.scss';
</style>
