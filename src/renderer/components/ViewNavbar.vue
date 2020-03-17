<template>
  <nav class="viewnav">
    <i class="searchbutton material-icons pointer text-dovegray h3" v-tooltip.bottom-center="'Cari data'">search</i>
    <span class="viewnav__name h3 text-dovegray">{{ $route.name }}</span>
    <i class="addbutton material-icons pointer text-dovegray h3" v-tooltip.bottom-center="'Tambah data'" @click="$root.$emit('addItem')">add</i>
    <i class="refreshbutton material-icons pointer text-dovegray h3" v-tooltip.bottom-center="'Refresh halaman'" @click="$root.$forceUpdate()">refresh</i>
  </nav>
</template>

<script>
export default {
 name: 'ViewNavbar'
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
      margin: margin($right:1rem);
    }
    .refreshbutton{
      margin: margin($right:0,$left:0);
    }
  }
</style>