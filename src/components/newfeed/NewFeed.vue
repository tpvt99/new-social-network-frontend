<template>
  <div>
    <template v-if="!isMinimized">
      <feed v-for="(stat, index) in feeds" :stat="stat" :key="stat"></feed>
    </template>
    <template v-else>
      <minimized-feed v-for="(stat, index) in feeds" :stat="stat" :key="stat"></minimized-feed>
    </template>
  </div>
</template>
<script>
import Feed from './Feed.vue'
import MinimizedFeed from './MinimizedFeed.vue'
export default {
  data () {
    return {
      allfeeds: []
    }
  },
  props: {
    isMinimized: {
      type: Boolean
    }
  },
  computed: {
    feeds () {
      return this.$store.getters['newfeed/getAll']
    },
    isMinimizedFeed () {
      return this.$store.getters['user/getMinimizedFeed']
    }
  },
  components: {
    'feed': Feed,
    minimizedFeed: MinimizedFeed
  }
}
</script>
