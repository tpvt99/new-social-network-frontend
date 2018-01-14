<template>
  <div class="_messChild" :data-id="friendId" data-frame="" tabindex="1" ref="mess" :title="fullname">
    <a :href="'/messages/' + friendId" class="_messBlock" @click.prevent="clickMessage">
      <template v-if="isOnline">
        <div class="_messDot _messDotOnline">
        </div>
      </template>
      <template v-else>
        <div class="_messDot _messDotOffline">
        </div>
      </template>
      <div class="_messImg">
        <img :src="profileimage" class="_Img">
      </div>
    </a>
  </div>
</template>
<script>
import time from '../../helpers/time.js'
export default {
  props: {
    friend: {
      type: Object
    }
  },
  computed: {
    // Use this property because the Object friend is friend.friend
    friendUser () {
      return this.friend.friend
    },
    profileimage () {
      return this.friendUser.profileimage !== '' ? this.friendUser.profileimage : '/static/image/user.jpeg'
    },
    fullname () {
      return this.friendUser.fullname
    },
    friendId () {
      return this.friendUser.id
    },
    profileUrl () {
      return this.friendUser.profileUrl
    },
    isOnline () {
      var friendOnlineTime = new Date(this.friend.time)
      time.setLocaleTime(friendOnlineTime)
      var now = new Date()
      time.setLocaleTime(now)
      var t = time.totalTime(friendOnlineTime, now, 'm')
      if (t < 5) return true
      return false
    }
  },
  methods: {
    onlineTime () {
      var friendOnlineTime = new Date(this.friend.time)
      time.setLocaleTime(friendOnlineTime)
      var now = new Date()
      time.setLocaleTime(now)
      var t = time.dateDiff(friendOnlineTime, now)
      if (t.y === 0) {
        if (t.d > 0) {
          return t.d + ' ' + 'ngày'
        } else if (t.h > 0) {
          return t.h + ' ' + 'giờ'
        } else if (t.m > 0) {
          return t.m + ' ' + 'phút'
        } else return t.s + '' + 'giây'
      }
    },
    clickMessage (e) {
      var r = this.$refs.mess
      let promise = new Promise((resolve, reject) => {
        var payload = {
          listId: [r.dataset.id],
          target: 'user',
          total: 2,
          frameId: r.dataset.frame,
          resolve: resolve,
          reject: reject
        }
        this.$store.dispatch('chat/beforeAddChatFrame', payload)
      })
      promise.then(a => {
        r.dataset.frame = a.frameId
      }).catch(() => {
      })
    }
  }
}
</script>
<style>
</style>
