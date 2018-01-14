<template>
  <div style="width:550px;">
    <feed v-for="(stat, index) in feeds" :stat="stat" :key="stat"></feed>
  </div>
</template>
<script>
import Feed from '../newfeed/Feed.vue'
export default {
  data () {
    return {
      allfeeds: [],
      height: []
    }
  },
  computed: {
    feeds () {
      return this.$store.getters['newfeed/getAll']
    }
  },
  components: {
    'feed': Feed
  },
  mounted () {
    this.$store.dispatch('newfeed/fetchStatusProfile', this.$route.params.profileUrl)
  },
  created () {
    var that = this
    window.onscroll = function (e) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        if (that.height.indexOf(document.body.offsetHeight) === -1) {
          that.height.push(document.body.offsetHeight)
          that.$store.dispatch('newfeed/fetchStatusProfile', that.$route.params.profileUrl)
        }
      }
    }
  }
}
</script>
