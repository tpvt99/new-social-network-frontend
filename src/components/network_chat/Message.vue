<template>
  <div class="networkMessageP row">
    <div class="messageChild _fl1">
      <template v-for="i in networkPeople">
        <message-child :frame="i" :key="i"></message-child>
      </template>
    </div>
  </div>
</template>
<script>
import MessageChild from './MessageChild.vue'
export default {
  created () {
    this.$store.dispatch('networkChat/getNetworkPeople')
    this.$store.dispatch('networkChat/pullRequest')
  },
  computed: {
    networkPeople () {
      return this.$store.getters['networkChat/getNetworkPeople']
    }
  },
  components: {
    messageChild: MessageChild
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/network/message.scss'
</style>
