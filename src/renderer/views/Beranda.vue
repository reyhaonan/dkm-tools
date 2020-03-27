<template>
  <main>
    <ViewNavbar/>
    <div class="data">
      <div class="data__container">
        <small>Keluarga</small><br>
        <span class="data__jml">{{dashboardData.jmlKeluarga}}</span>
      </div>
      <hr>
      <div class="data__container">
        <small>Warga</small><br>
        <span class="data__jml">{{dashboardData.jmlWarga}}</span>
      </div>
      <hr>
      <div class="data__container">
        <small>Laki laki</small><br>
        <span class="data__jml">{{dashboardData.lakiLaki}}</span>
      </div>
      <hr>
      <div class="data__container">
        <small>Perempuan</small><br>
        <span class="data__jml">{{dashboardData.perempuan}}</span>
      </div>
    </div>



    <img src="@/assets/worldmap.svg" style="width:100%;margin: 2rem 0" draggable="false">


    <div class="dashcontent">
    <a-card hoverable style="width: calc(50% - .5rem)">
    <DoughnutChart v-if="loaded" :chartdata="chart"></DoughnutChart>
    </a-card>

    <a-card hoverable style="width: calc(50% - .5rem)" @click.prevent="download">
      <a-icon type="download" class="downloadExcel"/>
      <a-card-meta title="Simpan laporan" class="lead"/>
    </a-card>
    </div>
  </main>
</template>

<script>
const { dialog } = require('electron').remote
const WIN = require('electron').remote.getCurrentWindow();
import moment from 'moment'

import ViewNavbar from '@/components/ViewNavbar'
import DoughnutChart from '@/components/DoughnutChart'


moment.locale('id')
export default { 
  components:{
    ViewNavbar,
    DoughnutChart
  },
  data(){
    return {
      dashboardData: {
        jmlKeluarga: 0,
        jmlWarga: 0,
        lakiLaki: 0,
        perempuan: 0,
        agama: [0,0,0,0,0,0]
      },
      chart: {
        labels: ['Islam','Kristen','Katolik','Hindu','Budha','Konghucu'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#4BC0C0','#36A2EB','#FF6384','#FF9F40','#FFCD56','#9966FF'],
            data: [0,0,0,0,0,0]
          }
        ]
      },
      loaded: false
      
    }
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.$http.get('/dashboard/data')
      .then(res => {
        this.dashboardData = res.data
        this.chart.datasets[0].data = res.data.agama
        this.loaded = true
      })
    },
    download(){

      dialog.showSaveDialog(WIN,{
        //Placeholder 1
        title: "Save file xls",
        
        //Placeholder 2
        defaultPath : "DataDKM " + moment().format('Do MMMM YYYY') + '.xlsx',
        
        //Placeholder 4
        buttonLabel : "Simpan file",
        
        //Placeholder 3
        filters :[
          {name: 'Microsoft excel', extensions: ['xlsx', 'xls']},
          // {name: 'Database file', extensions: ['sqlite']},
          {name: 'All Files', extensions: ['*']}
        ]
        }, path => this.$http.post('/exporttoexcel', {path: path})
      )
    }
  }
}
</script>

<style lang="scss">
.downloadExcel{
  font-size: 120px;
  color:$gray;
  position: absolute;
  top: 4rem;
  left:50%;
  transform:translateX(-50%)
}
.lead{
  text-align: center;
  position: absolute;
  bottom: 2rem;
  left:50%;
  transform:translateX(-50%)
}
.data{
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  &__container{
    flex-basis: 10%;
  }

  &__jml{
    @extend .h2, .text-dovegray;
  }

  small{
    transform: translateY(200px);
    font-size: 10px;
  }

  hr{
    height: 50px;
    border:1px solid $whiteLilac;
    background-color: $whiteLilac;
    margin: auto 0;
  }
}

.dashcontent{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>