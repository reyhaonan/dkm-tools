<template>
  <main>
    <ViewNavbar/>
    <button class="tabsbutton rounded h5 pointer" :class="currentTable == 'individuTable'? 'tabsbutton-active' : ''"  @click="setCurrentTable('individuTable')">Individu</button>
    <button class="tabsbutton rounded h5 pointer" :class="currentTable == 'kartuKeluargaTable'? 'tabsbutton-active' : ''"  @click="setCurrentTable('kartuKeluargaTable')">Kartu Keluarga</button>
    <div class="pagination">
      <button class="pagination__prev" @click="$root.$emit('prev')"><i class="material-icons">chevron_left</i></button>
      <button class="pagination__next" @click="$root.$emit('next')"><i class="material-icons">chevron_right</i></button>
    </div>
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
      currentTable : 'individuTable',
      nextPage: null,
      prevPage: null,
    }
  },
  methods: {
    setCurrentTable(tabs){
      this.currentTable = tabs
      this.nextPage = null
      this.prevPage = null
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
  min-height: 400px;
  overflow-x: auto;
  overflow-y: visible;
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
  padding: 1rem .3rem;
  text-align: center;
}


tbody tr{
  border-bottom: 1px solid $whiteLilac;

  &:hover{
    background-color: $alabaster;
  }
}
thead th{
  @extend .bg-alabaster, .text-bold;
}

.lockedcolumn{
  position: sticky;
  left:0;
  z-index:9
}

table{
  position: relative;
  z-index: 1;
}


.inputdata{
  border-bottom: 2px solid $chateauGreen;
  position: relative;
  padding: 1rem;
  input, select{
    background: none;
    border: none;
    width: 100%;
    text-align: center;
  }
}

.savebutton{
  position: absolute;
  display: flex;
  border: 2px solid $chateauGreen;
  right: 0;
  bottom: 0;
}
</style>