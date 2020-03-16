<template>
  <table border="0">
        <thead>
          <tr>
            <th>Nama</th>
            <th>NIK</th>
            <th>JK</th>
            <th>No KK</th>
            <th>Tempat lahir</th>
            <th>Tanggal lahir</th>
            <th>Agama</th>
            <th>Pendidikan</th>
            <th>Pekerjaan</th>
            <th>Status kawin</th>
            <th>Status dlm keluarga</th>
            <th>Kewarganegaraan</th>
            <th>No paspor</th>
            <th>No kitab</th>
            <th>Nama Ayah</th>
            <th>Nama Ibu</th>
            <th>Ket</th>
          </tr>
        </thead>
        <tbody>
          <tr class="inputdata" v-show="showInputData">
            <td><input type="text"></td>
          </tr>
        </tbody>
      </table>
</template>

<script>
export default {
  name: 'individuTable',
  data(){
    return {
      showInputData: true,
      inputData: {
        nama: '',
        nik: '',
        jenis_kelamin: '',
        no_kk: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        agama: '',
        pendidikan: '',
        pekerjaan: '',
        status_kawin: '',
        status_dalam_keluarga: '',
        kewarganegaraan: '',
        no_paspor: '',
        no_kitab: '',
        nama_ayah: '',
        nama_ibu: '',
        keterangan: '',
      }
    }
  },
  mounted(){
    this.$root.$on('addItem', () => {
      this.showInputData = true
    })
  }
}
</script>

<style lang="scss">

</style>