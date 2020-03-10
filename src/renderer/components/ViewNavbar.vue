<template>
  <nav class="viewnav">
    <i class="searchbutton material-icons pointer text-dovegray h3">search</i>
    <span class="viewnav__name h3 text-dovegray">{{ $route.name }}</span>
    <i class="refreshbutton material-icons pointer text-dovegray h3" @click="$forceUpdate()">refresh</i>
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
    position: relative;
    
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

    i{
      &:nth-child(1){
        margin: margin($left:0);
      }
      &:nth-last-child(1){
        margin: margin($right:0);
      }
    }
  }
</style>