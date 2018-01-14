<template>
  <form method="post" class="register-form" autocomplete="off">
    <div>
      <span class="fa fa-user-o icon"></span>
      <input type="text" placeholder="Họ và tên" v-model="name">
    </div>
    <div>
      <span class="fa fa-envelope-o icon"></span>
      <input type="text" placeholder="Email" v-model="email">
    </div>
    <div>
      <span class="fa fa-lock icon"></span>
      <input type="password" placeholder="Mật khẩu" v-model="password">
    </div>
    <button @click.prevent="handleSubmit" class="btn btn-submit">Đăng kí</button>
  </form>
</template>
<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>
