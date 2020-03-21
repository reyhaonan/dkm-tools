<template>
  <nav class="viewnav">
    <a-icon type="search" class="searchbutton " v-tooltip.bottom-center="'Cari data'"/>
    <span class="viewnav__name h3 text-dovegray">{{ $route.name }}</span>
    <a-icon type="plus" class="addbutton pointer" v-tooltip.bottom-center="'Tambah data'" @click="addItem"/>
  </nav>
</template>

<script>
export default {
 name: 'ViewNavbar',
 data(){
   return {
     tabs: 1
   }
 },
 mounted(){
   this.$root.$on('changeTabs',tabs => this.tabs = tabs)
 },
 methods: {
   addItem(){
     this.$root.$emit('addItemToTabs', this.tabs)
   }
 }
}
</script>

<style lang="scss">
  .viewnav{
    height: 50px;
    width: 100%;
    display: flex;
    position: sticky;
    top: 0;
    z-index: 20;
    background: white;
    
    &::after{
      content: '';
      position: absolute;
      height: 1px;
      width: calc(100% + 4rem);
      bottom: 0;
      left: -2rem;
      background: $whiteLilac;
    }


    &__name{
      z-index: 1;
      position: absolute;
      top: 50%;left: 50%;
      transform: translate(-50%,-50%);
    }

    .searchbutton{
      margin: margin($left:0);
    }
    .addbutton{
      margin: margin($right:0);
    }
  }
</style>