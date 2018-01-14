<template>
  <div class="_bg_child">
    <div class="_bg_c1">
      <div class="pr_img">
        <img :src="profileImage">
      </div>
      <div class="pr_name">
        <h2>
          <a :href="'/profile/' + profileUrl" style="color:inherit;font-weight:400;">{{ fullname }}</a>
        </h2>
      </div>
    </div>
    <template v-if="!isAnonymous">
      <template v-if="!isSelf">
        <div class="_bg_c2">
          <div>
            <template v-if="!isFriend">
              <button class="btn" @click="">
                <i class="ion ion-android-person-add"></i>
                <span>Kết bạn</span>
              </button>
            </template>
            <template v-else>
              <button class="btn">
                <i class="fa fa-user-o"></i>
                <span>Đã kết bạn</span>
              </button>
            </template>
          </div>
          <div>
            <button class="btn">
              <i class="fa fa-rss"></i>
              <span>Theo dõi</span>
            </button>
          </div>
          <div>
            <button class="btn">
              <i class="fa fa-comment-o"></i>
              <span>Nhắn tin</span>
            </button>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  computed: {
    profileImage () {
      return this.$store.getters['profile/getProfileImage']
    },
    fullname () {
      return this.$store.getters['profile/getFullname']
    },
    profileUrl () {
      return this.$route.params.profileUrl
    },
    isAnonymous () {
      return this.$store.getters['user/isAnonymous']
    },
    isSelf () {
      return this.$store.getters['profile/isSelf']
    },
    isFriend () {
      return this.$store.getters['profile/isFriend']
    },
    isStranger () {
      return this.$store.getters['profile/isStranger']
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/profile/main_user.scss';
</style>
