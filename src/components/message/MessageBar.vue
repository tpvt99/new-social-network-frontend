<template>
  <div class="pagebot">
    <div class="botmess _lauto" :class="marginRight">
      <div class="_mess_boxs _fl2a">
        <template v-if="componentView === 'friend'">
          <message-box v-for="chatFrame in chatFrames" :key="chatFrame" :chatFrame="chatFrame" :type="type"></message-box>
        </template>
        <template v-else>
          <message-box-network v-for="chatFrame in chatFrames" :key="chatFrame" :chatFrame="chatFrame" :type="type"></message-box-network>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import MessageBox from './MessageBox.vue'
import MessageBoxNetwork from '../network_chat/MessageBox.vue'
export default {
  props: ['type'],
  data () {
    return {
      marginRight: this.type === 'friend' ? 'MessageMarginRight' : 'MessageMarginRight0'
    }
  },
  components: {
    messageBox: MessageBox,
    messageBoxNetwork: MessageBoxNetwork
  },
  computed: {
    chatFrames () {
      if (this.type === 'friend') {
        return this.$store.getters['chat/getChatFrames']
      } else if (this.type === 'network') {
        return this.$store.getters['networkChat/getChatFrames']
      }
    },
    componentView () {
      if (this.type === 'friend') {
        return 'friend'
      } else if (this.type === 'network') {
        return 'network'
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/message/messagebox.scss';
</style>
