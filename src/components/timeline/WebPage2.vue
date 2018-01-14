<template>
  <div>
    <div class="clearfix row">
      <div class="col webpage1">
        <left></left>
      </div>
      <div class="col webpage2">
        <div class="middle-webpage">
          <div style="margin-top:10px;position:relative;">
            <post2></post2>
          </div>
          <div class="clearfix">
            <div class="dropdown mini-feed">
              <div @click="showDropdown" class="mf_dr">
                  <span class="ion ion-ios-infinite"></span>
                  <span>Trạng thái</span>
              </div>
              <div class="dropdown-menu mini-feed" ref="dropdownMenu">
                <ul>
                  <li @click="minimizedFeed(true)">
                    <span></span>
                    <span>Thu gọn</span>
                  </li>
                  <li @click="minimizedFeed(false)">
                    <span></span>
                    <span>Mở rộng</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div style="margin-top:-20px;z-index:1">
            <newfeeds :isMinimized="isMinimized"></newfeeds>
          </div>
        </div>
        <div class="right-webpage">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LeftPanel from './Left.vue'
import Post2 from '../post/Post2.vue'
import NewFeeds from '../newfeed/NewFeed.vue'
import dropdown from '../../helpers/dropdown.js'
export default {
  data () {
    return {
      height: [],
      isMinimized: false
    }
  },
  computed: {
    getName () {
      return this.$store.getters['user/getFullname']
    },
    isMinimizedFeed () {
      return this.$store.getters['user/getMinimizedFeed']
    }
  },
  methods: {
    showDropdown (e) {
      e.stopPropagation()
      dropdown.closeOtherDropdowns()
      this.$refs.dropdownMenu.style.display = 'block'
    },
    minimizedFeed (e) {
      this.isMinimized = e
    }
  },
  components: {
    left: LeftPanel,
    post2: Post2,
    newfeeds: NewFeeds,
    right: Right
  },
  created () {
    var that = this
    window.onscroll = function (e) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        if (that.height.indexOf(document.body.offsetHeight) === -1) {
          that.height.push(document.body.offsetHeight)
          that.$store.dispatch('newfeed/fetchStatus')
        }
      }
    }
  }
}
</script>
<style>
</style>
