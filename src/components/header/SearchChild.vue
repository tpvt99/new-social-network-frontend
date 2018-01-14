<template>
  <a :href="'/profile/' + profileUrl">
    <div class="_sc_">
      <div>
        <img :src="profileImage">
      </div>
      <div class="_lm">
        <p>{{fullname}}</p>
      </div>
    </div>
  </a>
</template>
<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    profileImage () {
      return this.user.profileimage !== '' ? this.user.profileimage : '/static/image/user.jpeg'
    },
    fullname () {
      return this.user.fullname
    },
    profileUrl () {
      return this.user.profileUrl
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/header/searchchild.scss';
</style>
