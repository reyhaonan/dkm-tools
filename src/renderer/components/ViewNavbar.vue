<template>
  <nav class="viewnav">
    <a-popover trigger="click" v-model="visible">
      <div slot="content">
          <a-input-search v-model="searchQuery" placeholder="Cari data" style="width: 160px" @search="onSearch" size="small"/>
          <a-button type="primary" size="small" @click.prevent="reset">Reset</a-button>
      </div>
      <!-- <a-button type="primary">Click me</a-button> -->
      <a-icon type="search" class="searchbutton pointer" v-if="$route.name == 'Data warga'"/>
    </a-popover>
    <a-icon type="close" v-show="searchQuery" class="reset pointer"  @click.prevent="reset"/>
    <span class="viewnav__name h3 text-dovegray">{{ $route.name }}</span>
    <a-icon type="plus" class="addbutton pointer" v-tooltip.bottom-center="'Tambah data'" @click="addItem" v-if="$route.name == 'Data warga' || $route.name == 'Pengaturan'"/>
  </nav>
</template>

<script>
export default {
 name: 'ViewNavbar',
 data(){
   return {
     tabs: 1,
     visible: false,
     searchQuery: ''
   }
 },
 mounted(){
   this.$root.$on('changeTabs',tabs => this.tabs = tabs)
 },
 methods: {
   onSearch(query, event){
     this.$root.$emit('onSearch',query)
   },
   reset(){
      this.$root.$emit('onReset')
      this.searchQuery = ''
   },
   addItem(){
     this.$root.$emit('addItemToTabs', this.tabs)
   }
 }
}
</script>

<style lang="scss">
.reset{
  margin: margin($left:1rem)
}
  .viewnav{
    height: 50px;
    width: calc(100% + 4rem); 
    transform: translateX(-2rem);
    padding: 0 2rem;
    display: flex;
    position: sticky;
    top: 0;
    z-index: 200;
    background: white;
    
    &::after{
      content: '';
      position: absolute;
      height: 1px;
      width: 100%;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background: $whiteLilac;
    }


    &__name{
      z-index: 1;
      position: absolute;
      top: 50%;left: 50%;
      transform: translate(-50%,-50%);
    }

    .searchbutton{
      margin: margin($left:0,$right:0);
    }
    .addbutton{
      margin: margin($right:0);
    }
  }
</style>
