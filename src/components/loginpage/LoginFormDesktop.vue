<template>
  <form method="post" class="login-form" autocomplete="off" ref="form">
    <div>
      <div class="ui input icon">
        <i class="fa fa-envelope icon"></i>
        <input type="text" placeholder="Email" v-model="user.email" class="form-input">
      </div>
    </div>
    <div>
      <div class="ui input icon">
        <i class="fa fa-lock icon"></i>
        <input type="password" placeholder="Mật khẩu" v-model="user.password" class="form-input">
      </div>
    </div>
    <div v-if="error" style="color:red;text-align:center;">
      <div style="width:90%;">
        <p>{{error}}</p>
      </div>
    </div>
    <div>
      <button @click.prevent="handleSubmit" class="button">Đăng nhập</button>
    </div>
  </form>
</template>
<script>
import auth from '../../auth/auth.js'
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    handleSubmit () {
      auth.login(this, this.user, {name: 'timeline'})
    }
  }
}
</script>
