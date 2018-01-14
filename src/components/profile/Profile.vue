<template>
  <div>
    <div class="global-header">
      <div class="global-inner">
        <header-comp></header-comp>
      </div>
    </div>
    <div class="global-body">
      <web-page :profileUrl="profileUrl"></web-page>
    </div>
  </div>
</template>
<script>
import Webpage from './WebPage.vue'
import Header from './../header/Header.vue'
export default {
  data () {
    return {
    }
  },
  props: {
    profileUrl: {
      type: String
    }
  },
  components: {
    headerComp: Header,
    webPage: Webpage
  },
  mounted () {
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.dropdown-menu').forEach(function (e) {
        e.style.display = 'none'
      })
    })
    document.body.style.backgroundColor = '#f9f9f9'
  },
  created () {
    this.$store.dispatch('profile/fetchProfileVisited', this.$route.params.profileUrl)
  }
}
</script>
<style lang="scss">
@import './../../../static/scss/timeline/timeline.scss';
</style>
