<template>
  <form method="post" class="register-form" autocomplete="off">
    <div>
      <div class="ui input icon">
        <i class="fa fa-user-o icon"></i>
        <input type="text" placeholder="Họ và tên" v-model.trim="user.fullname" class="form-input">
      </div>
    </div>
    <div>
      <div style="width:90%;">
        <p>{{error_fullname}}</p>
      </div>
    </div>
    <div>
      <div class="ui input icon">
        <i class="fa fa-envelope icon"></i>
        <input type="text" placeholder="Email" v-model.trim="user.email" class="form-input">
      </div>
    </div>
    <div>
      <div style="width:90%;">
        <p>{{error_email}}</p>
      </div>
    </div>
    <div>
      <div class="ui input icon">
        <i class="fa fa-lock icon"></i>
        <input type="password" placeholder="Mật khẩu" v-model.trim="user.password" class="form-input">
      </div>
    </div>
    <div>
      <div style="width:90%;">
        <p>{{error_password}}</p>
      </div>
    </div>
    <div>
      <div style="width:90%;">
        <p>{{error}}</p>
      </div>
    </div>
    <div>
      <button @click.prevent="handleSubmit" class="button">Đăng kí</button>
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
        password: '',
        fullname: ''
      },
      error: '',
      error_fullname: '',
      error_password: '',
      error_email: ''
    }
  },
  methods: {
    validateEmail (email) {
    /* eslint-disable no-useless-escape */
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    /* eslint-enable */
      return re.test(email)
    },
    handleSubmit () {
      var submit = true
      this.error = ''
      this.error_fullname = ''
      this.error_password = ''
      this.error_email = ''
      if (this.user.password.length < 6) {
        this.error_password = 'Mật khẩu tối thiểu 6 kí tự'
        submit = false
      } else if (!this.validateEmail(this.user.email)) {
        this.error_email = 'Email không hợp lệ'
        submit = false
      } else if (this.user.fullname.length < 6) {
        this.error_fullname = 'Tên đăng kí không hợp lệ'
        submit = false
      }
      if (submit) {
        auth.register(this, this.user, {name: 'timeline'})
      }
    }
  }
}
</script>
