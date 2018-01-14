<template>
  <div>
    <div>
      <a href="#" @click="logout">Đăng xuất</a>
    </div>
    <div>
      <a :href="profileUrl">Trang cá nhân</a>
    </div>
  </div>
</template>
<script>
import auth from '../../auth/auth.js'
export default {
  methods: {
    logout () {
      auth.logout(this, {name: 'frontpage'})
    }
  },
  computed: {
    // user who is loggin
    profileUrl () {
      return 'profile/' + this.$store.getters['user/getProfileUrl']
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/header/userheader.scss';
</style>
