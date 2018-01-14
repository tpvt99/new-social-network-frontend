<template>
  <div class="_mess_a _messwidth" v-if="onlineFriends.length > 0">
    <div class="_hfixed"></div>
    <div class="_mess_b">
      <div class="_mess_list">
        <div class="_mess_fr">
          <template v-for="friend in onlineFriends">
            <message-child :friend="friend" :key="friend"></message-child>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MessageChild from './MessageChild.vue'
export default {
  created () {
    this.$store.dispatch('chat/pullRequest')
    this.$store.dispatch('chat/fetchFriendOnlines')
  },
  components: {
    messageChild: MessageChild
  },
  computed: {
    onlineFriends () {
      return this.$store.getters['chat/getFriendOnlines']
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/message/message.scss';
</style>
