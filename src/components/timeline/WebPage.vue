<template>
  <div>
    <div class="clearfix row rowTimeline">
      <div class="col webpage1">
        <left></left>
      </div>
      <div class="col webpage2">
        <div class="middle-webpage">
          <div style="position:relative;">
            <post2></post2>
          </div>
          <div class="clearfix">
            <div class="dropdown mini-feed">
              <div @click="showDropdown" class="mf_dr">
                  <span class="fa fa-random"></span>
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
          <tab-followers v-if="showTab"></tab-followers>
          <div>
            <newfeeds :isMinimized="isMinimized"></newfeeds>
          </div>
        </div>
      </div>
      <message></message>
    </div>
  </div>
</template>
<script>
import TabFollowers from './components/TabFollowers.vue'
import Message from '../message/Message.vue'
import LeftPanel from './Left.vue'
import Post2 from '../post/Post2.vue'
import NewFeeds from '../newfeed/NewFeed.vue'
import dropdown from '../../helpers/dropdown.js'
import Right from './Right.vue'
export default {
  data () {
    return {
      height: [],
      isMinimized: false,
      showTab: false,
      showSale: false
    }
  },
  computed: {
    getName () {
      return this.$store.getters['user/getFullname']
    },
    isMinimizedFeed () {
      return this.$store.getters['user/getMinimizedFeed']
    },
    tabSection () {
      return this.$route.query.tab
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
    message: Message,
    tabFollowers: TabFollowers,
    right: Right
  },
  created () {
    var tab = this.$route.query.tab
    if (tab === 'family') {
      this.showTab = true
    } else if (tab === 'sale') {
      this.showSale = true
    }
    let payload = {
      tab_section: this.$route.query.tab === undefined ? '' : this.$route.query.tab
    }
    var that = this
    window.onscroll = function (e) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        if (that.height.indexOf(document.body.offsetHeight) === -1) {
          that.height.push(document.body.offsetHeight)
          that.$store.dispatch('newfeed/fetchStatus', payload)
        }
      }
    }
    document.body.style.backgroundColor = '#f9f9f9'
  }
}
</script>
