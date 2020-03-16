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
            <td><input type="text" v-model="inputData.nama"></td>
            <td><input type="text" v-model="inputData.nik"></td>
            <td><input type="text" v-model="inputData.no_kk"></td>
            <td><input type="text" v-model="inputData.tempat_lahir"></td>
            <td><vc-date-picker :input-props='{
    class: "date"}' type="text" v-model="inputData.tanggal_lahir"/></td>
          </tr>

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
          </tr><tr>
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
        tanggal_lahir: new Date,
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
  table{
    position: relative;
    z-index: 1;
  }
</style>