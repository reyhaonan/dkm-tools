<template>
  <main>
    <ViewNavbar/>
    <a-tabs defaultActiveKey="1" @change="onChangeTab">
      <a-tab-pane tab="Tabel Kartu Keluarga" key="1">
        <kartuKeluargaTable/>
      </a-tab-pane>
      <a-tab-pane tab="Tabel Individu" key="2" forceRender>
        <individuTable/>
      </a-tab-pane>
    </a-tabs>
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
      currentTable : 'kartuKeluargaTable',
      pagesize: 10,
      links: {
        nextPage: null,
        prevPage: null,
        currentPage: null,
        lastPage: null
      },
      active: 1
    }
  },
  methods: {
    onChangeTab(active){
      this.$root.$emit('changeTabs',active)
    }
  }
}
</script>
