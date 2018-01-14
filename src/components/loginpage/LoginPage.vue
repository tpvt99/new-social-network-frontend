<template>
  <component :is="view"></component>
</template>
<script>
import LoginPageDesktop from './LoginPageDesktop.vue'
import LoginPageMobile from './LoginPageMobile.vue'
import auth from '../../auth/auth.js'
export default {
  data () {
    return {
      view: ''
    }
  },
  components: {
    logindesktop: LoginPageDesktop,
    loginmobile: LoginPageMobile
  },
  created () {
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    if (width <= 480) {
      this.view = 'logindesktop'
    } else {
      this.view = 'logindesktop'
    }
  },
  beforeRouteEnter (to, from, next) {
    var p = new Promise(function (resolve, reject) {
      auth.checkAuthentication(resolve, reject)
    })
    p.then(function () {
      next({name: 'timeline'})
    }).catch(function () {
      next()
    })
  }
}
</script>
<style lang="scss">
</style>
