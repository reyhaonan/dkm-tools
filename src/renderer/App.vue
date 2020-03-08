<template>
  <div id="app">
    <vue-progress-bar />
    <navigation-bar v-if="!$route.meta.login"/>
    <router-view class="view rounded shadow bg-white"></router-view>
    <vc-calendar id="calendars" v-if="!$route.meta.login"/>
  </div>
</template>

<script>
import NavigationBar from '@/components/Navigationbar'

export default {
  name: 'aplikasidkm',
  components: {
    NavigationBar
  },
  updated: function () {
    this.$nextTick(function () {
      var e = document.getElementById("calendars").classList
      e.remove("vc-border")
      e.add("shadow")
    })
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.finish()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  }
}
</script>

<style lang="scss">
#app{
  display: flex;
  justify-content: space-between;
}

.view{
  flex-basis: calc(100% - 222px - 256px - 4rem);
  padding: 0 1rem;
}

</style>
