<template>
  <div>
    <div class="introNetwork">
      <a href="/network">
        <img src="/static/image/timeline/world_friends.jpg">
        <div>
          <p>Kết nối bạn bè khắp 5 châu</p>
        </div>
      </a>
    </div>
    <div class="rightMessage">
      <div class="personChat">
        <div class="pCTitle">
          <h3>Chat với bạn bè</h3>
        </div>
        <div class="_fl1">
          <template v-for="friend in onlineFriends">
            <message-child :friend="friend" :key="friend"></message-child>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MessageChild2 from '../message/MessageChild.vue'
export default {
  created () {
    this.$store.dispatch('chat/pullRequest')
    this.$store.dispatch('chat/fetchFriendOnlines')
  },
  components: {
    messageChild: MessageChild2
  },
  computed: {
    onlineFriends () {
      return this.$store.getters['chat/getFriendOnlines']
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/timeline/right_timeline.scss';
</style>
