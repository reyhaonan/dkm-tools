<template>
  <div id="app">
    <navigation-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from '@/components/Navigationbar'
  export default {
    name: 'aplikasidkm',
    components: {
      NavigationBar
    }
  }
</script>

<style>
  /* CSS */
</style>
