<template>
  <div class="row">
    <rooms v-for="room in allRooms" :room="room" :key="room"></rooms>
  </div>
</template>
<script>
// this component is for each room item
import RoomsInTopic from './RoomsInTopic.vue'
export default {
  computed: {
    // getting all rooms that user has chatted till now
    allRooms () {
      return this.$store.getters['networkChatroom/getAllRooms']
    }
  },
  components: {
    rooms: RoomsInTopic
  }
}
</script>
