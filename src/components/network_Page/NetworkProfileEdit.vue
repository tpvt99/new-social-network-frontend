<template>
  <div class="row" v-if="profileUser !== undefined">
    <p style="margin: 10px 0;">Thay đổi thông tin</p>
    <div class="form-group ui input">
      <div class="pre_name">Họ và tên</div>
      <input type="text" v-model="user.fullname" placeholder="Họ và tên"> 
    </div>
  </div>
</template>
<script>
import { Mixin } from './Mixin1.js'
export default {
  data () {
    return {
      user: {
        fullname: '',
        sex: '',
        birthYear: '',
        nationality: ''
      }
    }
  },
  mixins: [Mixin]
}
</script>
