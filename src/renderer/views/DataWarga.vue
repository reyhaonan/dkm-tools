<template>
  <main>
    <ViewNavbar/>
    <button class="tabsbutton rounded h5 pointer" :class="currentTable == 'individuTable'? 'tabsbutton-active' : ''"  @click="setCurrentTable('individuTable')">Individu</button>
    <button class="tabsbutton rounded h5 pointer" :class="currentTable == 'kartuKeluargaTable'? 'tabsbutton-active' : ''"  @click="setCurrentTable('kartuKeluargaTable')">Kartu Keluarga</button>
    <div class="tablecontainer">
      <div v-bind:is="currentTable"></div>
    </div>
  </main>
</template>

<script>
import ViewNavbar from '@/components/ViewNavbar'
//table
import individuTable from '@/components/table/individuTable'
import kartuKeluargaTable from '@/components/table/kartuKeluargaTable'

export default {
  components: {
    ViewNavbar,
    individuTable,
    kartuKeluargaTable
  },
  data(){
    return {
      currentTable : 'individuTable'
    }
  },
  methods: {
    setCurrentTable(tabs){
      this.currentTable = tabs
    }
  }
}
</script>

<style lang="scss">
.tabsbutton{
  margin: 1rem 0;padding: .2rem .4rem;
  border: 1px solid $gray;
  color: $gray;
  background: rgba($gray,.02);
}

.tabsbutton-active{
  border: 1px solid $chateauGreen;
  color: $chateauGreen;
  background: rgba($chateauGreen,.2);
}

.tablecontainer{
  width: 100%;
  overflow: auto;
}

table, th, td {
  border: none;
  border-collapse: collapse;
  position: relative;
}

th, td{
  @extend .text-dovegray, .h4;
  border: none !important;
  font-weight: 400;
  padding: .3rem 2rem;
}

tbody tr{
  border-bottom: 1px solid $whiteLilac;

  &:hover{
    background-color: $alabaster;
  }
}
thead th{
  @extend .bg-alabaster;
}

.lockedcolumn{
  position: sticky;
  left:0;
  z-index:9
}
</style>