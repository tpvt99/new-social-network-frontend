<template>
  <div class="_fl1" style="flex-direction: column-reverse">
    <chat-child v-for="message in allMessages" :message="message" :allUsers="allUsers" :key="message" :type="type"></chat-child>
  </div>
</template>
<script>
import ChatChild from './ChatChild.vue'
export default {
  props: {
    allMessages: {
      type: Array
    },
    allUsers: {
      type: Array
    },
    type: {
      type: String
    }
  },
  components: {
    chatChild: ChatChild
  }
}
</script>
