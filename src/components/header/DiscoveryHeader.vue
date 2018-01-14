<template>
  <div class="dropdown disco-header">
    <div class="disco-wrap" @click="discoClick">
      <span class="disco-text">Khám phá</span>
      <span class="fa fa-caret-down _lm"></span>
    </div>
    <div class="dropdown-menu _hfixed_top" ref="discoveryDropdown">
      <div>
        <div class="col span-1-of-6">
          <p class="di_main">
            <a :href="timelinePath" class="_cl_inherit">Bảng tin</a></p>
          <p class="di_child">
            <a href="/timeline?tab=friend" class="_cl_inherit">Bạn bè</a>
          </p>
          <p class="di_child">
            <a href="/timeline?tab=sale" class="_cl_inherit">Mua và bán</a>
          </p>
        </div>
        <div class="col span-1-of-6">
          <p class="di_main">
            <a :href="networkPath" class="_cl_inherit">Kết nối bạn bè</a>
          </p>
          <p class="di_child">
            <a class="_cl_inherit" href="/network/goal">Quản lý mục đích</a>
          </p>
          <p class="di_child">
            <a class="_cl_inherit" href="/network/chatroom">Chat nhóm</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dropdown from '../../helpers/dropdown.js'
import routes from '../../routes.js'
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    discoClick (e) {
      e.stopPropagation()
      dropdown.closeOtherDropdowns()
      this.$refs.discoveryDropdown.style.display = 'block'
    }
  },
  computed: {
    networkPath () {
      return routes.network.path
    },
    timelinePath () {
      return routes.timeline.path
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/header/discoveryheader.scss';
</style>
