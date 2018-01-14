<template>
  <div class="left-timeline">
    <div class="_left_a">
      <div class="_left_aa">
        <div class="left-item left-item-main left-item-active">
          <a href="/timeline/" class="_cl_inherit">
            <span>Bảng tin</span>
          </a>
        </div>
        <div class="left-item">
          <a href="/timeline/?tab=friend" class="_cl_inherit">
            <i class="icon ion-android-contacts"></i>
            <span>Bạn bè</span>
          </a>
        </div>
        <div class="left-item">
          <a href="/timeline/?tab=sale" class="_cl_inherit">
            <i class="icon ion-ios-cart-outline"></i>
            <span>Mua bán</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/timeline/left_timeline.scss'
</style>
