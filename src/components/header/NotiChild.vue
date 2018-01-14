<template>
  <div class="_noti_child clearfix">
    <div class="_noti_uimg">
      <img :src="userProfilepic">
    </div>
    <div class="_noti_cont">
      <span class="name">
        {{ userName }}
      </span>
      <span class="_noti_contx">
        <template v-if="notiType == 'status-b'">
          <span>
            đã bình luận bài viết của bạn
          </span>
          <p class="_elip_text" style="width:230px;">
            <i>
              {{ notiComment }}
            </i>
          </p>
        </template>
        <template v-else-if="notiType == 'status-a'">
          <span>
            đã thích bài viết của bạn
          </span>
        </template>
      </span>
    </div>
    <div class="_noti_time">
      {{ notiTime }}
    </div>
  </div>
</template>
<script>
import time from '../../helpers/time.js'
export default {
  props: {
    noti: {
      type: Object
    }
  },
  computed: {
    userProfilepic () {
      return this.noti.data.user.profileimage !== '' ? this.noti.data.user.profileimage : '/static/image/user.jpeg'
    },
    userName () {
      return this.noti.data.user.fullname
    },
    notiType () {
      return this.noti.noti_type
    },
    notiTime () {
      var client = new Date(this.noti.time)
      time.setLocaleTime(client)
      var now = new Date()
      time.setLocaleTime(now)
      var diffTime = time.dateDiff(now, client)
      if (diffTime.y > 1) {
        return diffTime.y + 'y'
      } else if (diffTime.d > 1) {
        return diffTime.d + 'd'
      } else if (diffTime.h > 1) {
        return diffTime.h + 'h'
      } else if (diffTime.m > 1) {
        return diffTime.m + 'p'
      } else {
        return diffTime.s + 's'
      }
    },
    notiComment () {
      return this.noti.data.comment
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/header/notichild.scss';
</style>
