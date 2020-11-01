<template>
  <div id="app">
     <nav-top/>
 <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import NavTop from '@/components/NavTop'
export default {
  components: {
    NavTop
  }
}
</script>
<style scoped>
@import url('../src/assets/css/normalize.css');
</style>
