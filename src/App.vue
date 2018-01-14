<template>
  <div class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
import { getcsrftoken } from './security/csrf_token.js'
export default {
  created () {
    getcsrftoken(this)
  },
  mounted () {
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.dropdown-menu').forEach(function (e) {
        e.style.display = 'none'
      })
    })
  }
}
</script>
<style lang="scss">
@import '../static/scss/basic.scss';
@import '../static/scss/queries.scss';
@import '../static/scss/effect';
@import '../static/vendors/css/Grid.css';
</style>
