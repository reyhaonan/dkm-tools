<template>
  <table border="0" class="kartuKeluargaTable">
    <thead>
      <tr>
        <th>No KK</th>
        <th>Kepala keluarga</th>
        <th>Alamat</th>
        <th>Provinsi</th>
        <th>Kabupaten</th>
        <th>Kecamatan</th>
        <th>Desa</th>
        <th>Kode pos</th>
        <th>RT</th>
        <th>RW</th>
        <th>ket</th>
      </tr>
    </thead>
    <tbody>
      <tr class="inputdata" v-show="showInputData">
        <td><input type="text" v-model="inputData.noKk" autofocus placeholder="..."></td>
        <td><input type="text" v-model="inputData.kepalaKeluarga" placeholder="..."></td>
        <td><input type="text" v-model="inputData.alamat" placeholder="..."></td>
        <td><input type="text" v-model="inputData.provinsi" placeholder="..."></td>
        <td><input type="text" v-model="inputData.kabupaten" placeholder="..."></td>
        <td><input type="text" v-model="inputData.kecamatan" placeholder="..."></td>
        <td><input type="text" v-model="inputData.desa" placeholder="..."></td>
        <td><input type="text" v-model="inputData.kodePos" placeholder="..."></td>
        <td><input type="text" v-model="inputData.rt" placeholder="..."></td>
        <td><input type="text" v-model="inputData.rw" placeholder="..."></td>
        <td><input type="text" v-model="inputData.ket" placeholder="..."></td>
        <button type="submit" class="savebutton bg-chateaugreen"  v-tooltip.bottom-center="'Simpan data'"><i class="material-icons text-white pointer">save</i></button>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'kartuKeluargaTable',
  data(){
    return {
      inputData: {
        noKk: '',
        kepalaKeluarga: '',
        alamat: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        desa: '',
        kodePos: '',
        rt: '',
        rw: '',
        ket: ''
      },
      showInputData: false,
      isEditData: false,
      kk: [],
      pagesize: 2
    }
  },
  mounted(){
    this.$root.$on('addItem', () => {
      this.showInputData = true
    })

    // this.$root.$on('next', () => {
    //   this.fetch
    // })

    this.fetchKk()
  },
  methods: {
    fetchKk(page){
      let url = page? `/kk/${this.pagesize}/${page}` : `/kk/${this.pagesize}/1`

      this.$http.get(url)
      .then(res => {
        this.kk = res.data.data
        this.$root.$emit('pageChange',res.data.prev, res.data.next)
      })
      .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="scss">
.kartuKeluargaTable{
  min-width: 300%;
  width: 320%;
}
</style>