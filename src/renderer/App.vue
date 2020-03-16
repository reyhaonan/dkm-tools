<template>
  <div id="app">
    <navigation-bar v-if="!$route.meta.login"/>
    <router-view class="view rounded shadow bg-white"></router-view>
    <vc-calendar id="calendars" v-if="!$route.meta.login" :attributes="attributes" />
  </div>
</template>

<script>
import NavigationBar from '@/components/Navigationbar'

export default {
  name: 'aplikasidkm',
  data(){
    return {
      attributes: [
      {
        key: 'today',
        highlight: {
          color: 'green',
          fillMode: 'light',
          contentClass: 'italic', // Class provided by TailwindCSS
        },
        dates: new Date()
      }
      ]
    }
  },
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
  mounted(){
    this.$electron.ipcRenderer.on('navigate', (e, routePath) => {
      this.$router.push(routePath)
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
  padding: 0 2rem 2rem 2rem;
  height: calc(100vh - 2rem);
  overflow: auto;
}

#calendars{
  max-height: 270px;
  overflow: hidden;
}
</style>
