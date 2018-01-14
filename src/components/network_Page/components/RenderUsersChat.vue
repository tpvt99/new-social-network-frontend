<template>
  <div class="listItem _fl1">
    <img :src="profileImage" class="img">
    <span class="_lm"><a class="_cl_inherit" :href="'/network/user/' + profileUrl">{{ profileName }}</a></span>
  </div>
</template>
<script>
export default {
  props: ['user'],
  computed: {
    profileImage () {
      return this.user.profile_picture.image_url
    },
    profileName () {
      return this.user.fullname
    },
    profileUrl () {
      return this.user.network_id
    }
  }
}
</script>
