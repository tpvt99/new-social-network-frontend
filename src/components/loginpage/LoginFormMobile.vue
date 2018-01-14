<template>
  <form method="post" class="login-form" autocomplete="off">
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Mật khẩu" v-model="password">
    <button @click.prevent="handleSubmit" class="btn btn-submit">Đăng nhập</button>
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
