<template>
  <div>
    <div class="tabShow _fl1">
      <div class="TabAdd _fl1 _fl1a">
        <span class="fa fa-plus-square-o" style="cursor:pointer;" title="Thêm người" @click="addPeople"></span>
      </div>
    </div>
    <div v-if="isShow" class="ui input" style="margin:10px 0;">
      <div class="dropdown">
        <input type="text" placeholder="Tên bạn muốn thêm vào" @input="handleInput">
        <div class="dropdown-menu">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import querystring from 'query-string'
import { TAB_FOLLOWERS } from '../../../api/api.js'
export default {
  data () {
    return {
      isShow: false,
      friendList: [],
      friendIds: []
    }
  },
  methods: {
    addPeople () {
      this.isShow = true
    },
    handleInput (e) {
      var payload = {
        input_name: e.target.value,
        action_type: 'filter_user',
        tab_name: this.$route.query.tab,
        tab_id: this.$route.query.id,
        friend_ids: this.friendIds
      }
      axios({
        method: 'GET',
        baseURL: TAB_FOLLOWERS,
        params: payload,
        paramsSerializer: function (params) {
          return querystring.stringify(params)
        },
        withCredentials: true
      }).then(e => {
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../../../static/scss/timeline/tab_followers.scss';
</style>
