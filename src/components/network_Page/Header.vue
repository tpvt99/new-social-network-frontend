<template>
  <div class="_hh1">
    <div class="row _fl4a _hh1">
      <div>
        <a :href="homepage">
          <h3>
            <span style="color:red;">L</span>
            <span style="color:blue;">i</span>
            <span style="color:green;">f</span>
            <span style="color:orange;">e</span>
            <span style="color:pink;">l</span>
            <span style="color:purple;">e</span>
            <span style="color:black;">a</span>
            <span style="color:brown;">d</span>
          </h3>
        </a>
      </div>
      <div style="margin:0 20px;">
        <discovery-header></discovery-header>
      </div>
    </div>
  </div>
</template>
<script>
import routes from '../../routes.js'
import DiscoveryHeader from '../header/DiscoveryHeader.vue'
export default {
  computed: {
    homepage () {
      return routes.timeline.path
    },
    isAnonymous () {
      return this.$store.getters['user/isAnonymous']
    }
  },
  components: {
    discoveryHeader: DiscoveryHeader
  }
}
</script>
