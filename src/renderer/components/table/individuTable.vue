<template>
  <table border="0" class="individuTable">
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
              <td><input type="text" v-model="inputData.nama" autofocus placeholder="..."></td>
              <td><input type="text" v-model="inputData.nik" placeholder="..."></td>
              <td><select v-model="inputData.jenisKelamin">
                  <option value="Laki laki" selected>Laki laki</option>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Lainnya">Lainnya</option>
                </select></td>
              <td><input type="text" v-model="inputData.noKk" placeholder="..."></td>
              <td><input type="text" v-model="inputData.tempatLahir" placeholder="..."></td>
              <td><vc-date-picker :input-props='{class: "date"}' type="text" v-model="inputData.tanggalLahir"/></td>
              <td><select v-model="inputData.agama">
                  <option value="Islam" selected>Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Budha">Budha</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Konghucu">Konghucu</option>
                </select></td>
              <td><input type="text" v-model="inputData.pendidikan" placeholder="..."></td>
              <td><input type="text" v-model="inputData.pekerjaan" placeholder="..."></td>
              <td><input type="text" v-model="inputData.statusKawin" placeholder="..."></td>
              <td><input type="text" v-model="inputData.statusDalamKeluarga" placeholder="..."></td>
              <td><select v-model="inputData.kewarganegaraan">
                  <option value="WNI" selected>WNI</option>
                  <option value="WNA">WNA</option>
                </select></td>
              <td><input type="text" v-model="inputData.noPaspor" placeholder="..."></td>
              <td><input type="text" v-model="inputData.noKitab" placeholder="..."></td>
              <td><input type="text" v-model="inputData.namaAyah" placeholder="..."></td>
              <td><input type="text" v-model="inputData.namaIbu" placeholder="..."></td>
              <td><input type="text" v-model="inputData.ket" placeholder="..."></td>
              <button type="submit" class="savebutton bg-chateaugreen" v-tooltip.bottom-center="'Simpan data'"><i class="material-icons text-white pointer">save</i></button>
          </tr>
          <tr>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
            <td>sda</td>
          </tr>

        </tbody>
      </table>
</template>

<script>
export default {
  name: 'individuTable',
  data(){
    return {
      showInputData: false,
      inputData: {
        nama: '',
        nik: '',
        jenisKelamin: '',
        noKk: '',
        tempatLahir: '',
        tanggalLahir: new Date,
        agama: '',
        pendidikan: '',
        pekerjaan: '',
        statusKawin: '',
        statusDalamKeluarga: '',
        kewarganegaraan: '',
        noPaspor: '',
        noKitab: '',
        namaAyah: '',
        namaIbu: '',
        keterangan: '',
      },
      isEditData: false
    }
  },
  mounted(){
    this.$root.$on('addItem', () => {
      this.showInputData = true
    })
  },
  methods: {
    addIndividu(){
      
    }
  }
}
</script>

<style lang="scss">
.individuTable{
  width: 400%;
}
</style>