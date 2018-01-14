<template>
  <div class="dropdown _ser_h">
    <div class="ui input icon">
      <i class="icon fa fa-search"></i>
      <input type="text" placeholder="Tìm kiếm ..." class="input-search" @keyup.prevent.stop="searchInput">
    </div>
    <div class="dropdown-menu" ref="dropdownMenu">
      <search-child v-for="user in users" :key="user" :user="user"></search-child>
    </div>
  </div>
</template>
<script>
import dropdown from '../../helpers/dropdown.js'
import SearchChild from './SearchChild.vue'
import { HEADER_SEARCH } from '../../api/api.js'
export default {
  data () {
    return {
      users: []
    }
  },
  methods: {
    searchInput (e) {
      var that = this
      var val = e.target.value.trim()
      if (val === '') {
        dropdown.closeOtherDropdowns()
        return
      }
      this.$http({
        method: 'GET',
        url: HEADER_SEARCH,
        params: {
          'q': val
        },
        withCredentials: true
      }).then((a) => {
        if (a.data.status_code === 'ok') {
          that.users = a.data.data.users
          if (that.users.length > 0) {
            dropdown.closeOtherDropdowns()
            that.$refs.dropdownMenu.style.display = 'block'
          } else {
            that.$refs.dropdownMenu.style.display = 'none'
          }
        }
      })
    }
  },
  components: {
    searchChild: SearchChild
  }
}
</script>
<style>
</style>
