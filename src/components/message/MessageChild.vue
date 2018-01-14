<template>
  <div class="_mess_ch" :data-id="friendId" data-frame="" tabindex="1" ref="mess">
    <a :href="'/messages/' + friendId" class="_mess_block" @click.prevent="clickMessage">
      <div class="_mess_fn _elip">
        {{ fullname }}
      </div>
      <template v-if="isOnline()">
        <div class="_mess_img">
          <img :src="profileimage" class="_img">
        </div>
        <div class="m_i_on">
        </div>
      </template>
      <template v-else>
        <div class="_mess_img _mess_img_bg _fl1a _fl1" :style="{backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(' + profileimage + ')'}">
          <span>
            {{ onlineTime() }}
          </span>
        </div>
      </template>
      <!--
      -->
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
    }
  },
  methods: {
    isOnline () {
      var friendOnlineTime = new Date(this.friend.time)
      time.setLocaleTime(friendOnlineTime)
      var now = new Date()
      time.setLocaleTime(now)
      var t = time.totalTime(friendOnlineTime, now, 'm')
      if (t < 1) return true
      return false
    },
    onlineTime () {
      var friendOnlineTime = new Date(this.friend.time)
      time.setLocaleTime(friendOnlineTime)
      var now = new Date()
      time.setLocaleTime(now)
      var t = time.dateDiff(friendOnlineTime, now)
      if (t.y === 0) {
        if (t.d > 0) {
          return t.d + '' + 'd'
        } else if (t.h > 0) {
          return t.h + '' + 'h'
        } else if (t.m > 0) {
          return t.m + '' + '\''
        } else return t.s + '' + 's'
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
