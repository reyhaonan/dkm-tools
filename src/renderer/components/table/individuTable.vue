<template>
  <div>
    <a-table :columns="columns" :dataSource="individu" rowKey="id" :scroll="{x:2400}" :pagination="false">
      <template
        v-for="col in ['nama','nik','tempatLahir','tanggalLahir','pendidikan','pekerjaan','statusKawin','statusDalamKeluarga','kewarganegaraan','noPaspor','noKitab','namaAyah','namaIbu','ket']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.id, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>


      <template slot="tanggalLahir" slot-scope="text, record">
        <a-date-picker v-if="record.editable" @change="e => handleChange(e, record.id, 'tanggalLahir')" :defaultValue="moment(record.tanggalLahir)"  style="width: 140px"/>

        <template v-else>{{moment(text).format('Do MMMM YYYY')}}</template>
      </template>
        
      <template slot="jenisKelamin" slot-scope="text, record">
        <a-select v-if="record.editable" :defaultValue="record.jenisKelamin" style="width: 120px" @select="e =>  handleChange(e, record.id, 'jenisKelamin')">
          <a-select-option value="Laki laki">Laki laki</a-select-option>
          <a-select-option value="Perempuan">Perempuan</a-select-option>
        </a-select>

        <template v-else>{{text}}</template>
      </template>
      
      <template slot="kewarganegaraan" slot-scope="text, record">
        <a-select v-if="record.editable" :defaultValue="record.kewarganegaraan" style="width: 120px" @select="e => handleChange(e, record.id, 'kewarganegaraan')">
          <a-select-option value="WNI">WNI</a-select-option>
          <a-select-option value="WNA">WNA</a-select-option>
        </a-select>

        <template v-else>{{text}}</template>
      </template>

      <template slot="agama" slot-scope="text, record">
        <a-select v-if="record.editable" :defaultValue="record.agama" style="width: 120px" @select="e => handleChange(e, record.id, 'agama')">
          <a-select-option value="Islam">Islam</a-select-option>
          <a-select-option value="Kristen">Kristen</a-select-option>
          <a-select-option value="Katolik">Katolik</a-select-option>
          <a-select-option value="Hindu">Hindu</a-select-option>
          <a-select-option value="Budha">Budha</a-select-option>
          <a-select-option value="Konghucu">Konghucu</a-select-option>
        </a-select>

        <template v-else>{{text}}</template>
      </template>
      <template slot="noKk" slot-scope="text, record">
        <a-select v-if="record.editable" :defaultValue="record.kartukeluargaId" style="width: 120px" @select="e => handleChange(e, record.id, 'kartukeluargaId')">
          <a-select-option :value="kkc.id" v-for="kkc in $store.state.KK" :key="kkc.id">{{ kkc.noKk }}</a-select-option>
        </a-select>

        <template v-else>{{text}}</template>
      </template>

      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations"  style="display:flex">
          <span v-if="record.editable">
            <a-icon type="save"  @click="() => saveEditedIndividu(record.id)" style="margin:auto"/>
            <a-popconfirm title="Yakin ingin membatalkan?" @confirm="() => cancel(record.id)">
              <a-icon type="close" class="pointer" style="margin:auto"/>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editId !== ''" @click="() => edit(record.id)" style="margin:auto">
              <a-icon type="edit"/>
            </a>
          </span>
          <a-popconfirm title="Hapus data ini?" @confirm="() => deleteIndividu(record.id)">
            <a style="margin:auto">
              <a-icon type="delete"/>
            </a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
    <a-pagination
      style="float:right"
        showSizeChanger
        :current="links.currentPage"
        :total="links.lastPage * 10"
        @change="onPaginationChange"
        @showSizeChange="onShowSizeChange"
      />

    <a-modal v-model="showIndividuModal" title="Tambah individu baru" :footer="null" style="top: 36px;">
      <a-form :form="form" layout="horizontal" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit.prevent="handleSubmit">
        <a-form-item label="Nama">
          <a-input v-model="form.nama" />
        </a-form-item>
        <a-form-item label="NIK">
          <a-input v-model="form.nik" />
        </a-form-item>
        <a-form-item label="Jenis Kelamin">
          <a-select v-model="form.jenisKelamin">
            <a-select-option value="Laki laki">Laki laki</a-select-option>
            <a-select-option value="Perempuan">Perempuan</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Nomor kartu keluarga">
          <a-select v-model="form.kartukeluargaId">
            <a-select-option :value="kk.id" v-for="kk in $store.state.KK" :key="kk.id">{{ kk.noKk }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Tempat Lahir">
          <a-input v-model="form.tempatLahir" />
        </a-form-item>
        <a-form-item label="Tanggal Lahir">
          <a-date-picker v-model="form.tanggalLahir"/>
        </a-form-item>
        <a-form-item label="Agama">
          <a-select v-model="form.agama">
            <a-select-option value="Islam">Islam</a-select-option>
            <a-select-option value="Kristen">Kristen</a-select-option>
            <a-select-option value="Katolik">Katolik</a-select-option>
            <a-select-option value="Hindu">Hindu</a-select-option>
            <a-select-option value="Budha">Budha</a-select-option>
            <a-select-option value="Konghucu">Konghucu</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Pendidikan">
          <a-input v-model="form.pendidikan" />
        </a-form-item>
        <a-form-item label="Pekerjaan">
          <a-input v-model="form.pekerjaan" />
        </a-form-item>
        <a-form-item label="Status kawin">
          <a-input v-model="form.statusKawin" />
        </a-form-item>
        <a-form-item label="Status dalam keluarga">
          <a-input v-model="form.statusDalamKeluarga" />
        </a-form-item>
        <a-form-item label="Kewarganegaraan">
          <a-select v-model="form.kewarganegaraan">
            <a-select-option value="WNI">WNI</a-select-option>
            <a-select-option value="WNA">WNA</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="No paspor">
          <a-input v-model="form.noPaspor" />
        </a-form-item>
        <a-form-item label="No kitab">
          <a-input v-model="form.noKitab" />
        </a-form-item>
        <a-form-item label="Nama ayah">
          <a-input v-model="form.namaAyah" />
        </a-form-item>
        <a-form-item label="Nama ibu">
          <a-input v-model="form.namaIbu" />
        </a-form-item>
         <a-form-item label="Keterangan">
          <a-textarea v-model="form.ket" autoSize />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 2, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Simpan
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import VueContext from '@/components/VueContext'
import moment from 'moment';
moment.locale('id')

export default {
  name: 'individuTable',
  components:{
    VueContext
  },
  data(){
    return {
      columns : [
        {
          title: 'Nama',
          dataIndex: 'nama',
          key: 'nama',
          scopedSlots: { customRender: 'nama' }
        },
        {
          title: 'NIK',
          dataIndex: 'nik',
          key: 'nik',
          scopedSlots: { customRender: 'nik' }
        },
        {
          title: 'Jenis Kelamin',
          dataIndex: 'jenisKelamin',
          key: 'jenisKelamin',
          scopedSlots: { customRender: 'jenisKelamin' }
        },
        {
          title: 'Nomor KK',
          dataIndex: 'kartukeluarga.noKk',
          key: 'noKk',
          scopedSlots: { customRender: 'noKk' }
        },
        {
          title: 'Tempat lahir',
          dataIndex: 'tempatLahir',
          key: 'tempatLahir',
          scopedSlots: { customRender: 'tempatLahir' }
        },
        {
          title: 'Tanggal lahir',
          dataIndex: 'tanggalLahir',
          key: 'tanggalLahir',
          scopedSlots: { customRender: 'tanggalLahir' }
        },
        {
          title: 'Agama',
          dataIndex: 'agama',
          key: 'agama',
          scopedSlots: { customRender: 'agama' }
        },
        {
          title: 'Pendidikan',
          dataIndex: 'pendidikan',
          key: 'pendidikan',
          scopedSlots: { customRender: 'pendidikan' }
        },
        {
          title: 'Pekerjaan',
          dataIndex: 'pekerjaan',
          key: 'pekerjaan',
          scopedSlots: { customRender: 'pekerjaan' }
        },
        {
          title: 'Status kawin',
          dataIndex: 'statusKawin',
          key: 'statusKawin',
          scopedSlots: { customRender: 'statusKawin' }
        },
        {
          title: 'Status dlm keluarga',
          dataIndex: 'statusDalamKeluarga',
          key: 'statusDalamKeluarga',
          scopedSlots: { customRender: 'statusDalamKeluarga' }
        },
        {
          title: 'Kewarganegaraan',
          dataIndex: 'kewarganegaraan',
          key: 'kewarganegaraan',
          scopedSlots: { customRender: 'kewarganegaraan' }
        },
        {
          title: 'Nomor Paspor',
          dataIndex: 'noPaspor',
          key: 'noPaspor',
          scopedSlots: { customRender: 'noPaspor' }
        },
        {
          title: 'Nomor Kitab',
          dataIndex: 'noKitab',
          key: 'noKitab',
          scopedSlots: { customRender: 'noKitab' }
        },
        {
          title: 'Nama Ayah',
          dataIndex: 'namaAyah',
          key: 'namaAyah',
          scopedSlots: { customRender: 'namaAyah' }
        },
        {
          title: 'Nama Ibu',
          dataIndex: 'namaIbu',
          key: 'namaIbu',
          scopedSlots: { customRender: 'namaIbu' }
        },
        {
          title: 'Keterangan',
          dataIndex: 'ket',
          key: 'ket',
          scopedSlots: { customRender: 'ket' }
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'action' },
        }
      ],
      form: {
        nama: '',
        nik: '',
        jenisKelamin: '',
        kartukeluargaId: '',
        tempatLahir: '',
        tanggalLahir: moment(),
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
      individu: [],
      pagesize: 10,
      editId: '',
      cache: undefined,
      showIndividuModal: false,
      moment,
      links: {
        currentPage: 1,
        nextPage: 2,
        prevPage: null,
        lastPage: null,
      }
    }
  },
  mounted(){
    this.$root.$on('addItemToTabs', tabs => {
      if(tabs == 2)this.showIndividuModal = true
    })

    this.$root.$on('onSearch', searchQuery => {
      this.fetchIndividu(1,searchQuery)
    })
    this.$root.$on('KKUpdate', () => this.fetchIndividu(1))

    this.$root.$on('onReset', () => {
      this.isSearch = true
      this.fetchIndividu(1)
    })

    this.fetchIndividu(1)
  },
  computed: {
    cacheData: {
      set(data){
        this.cache = data.map(item => ({ ...item }))
      },
      get(){
        return this.cache
      }
    }
  },
  methods: {
    debug(e){
      
    },
    onPaginationChange(page, pagesize){
      this.fetchIndividu(page)
    },
    onShowSizeChange(current, size){
      this.pagesize = size
      this.fetchIndividu(current)
      
    },
    saveEditedIndividu(id){
      const target = {...this.individu.filter(item => id == item.id)[0]}
      delete target.id
      
      this.$http.post('/editindividu', {form: target,id:id})
      .then(() => {
        delete target.editable
        this.editId = ''
        this.fetchIndividu(1)
      })
    },
    deleteIndividu(id){
      this.$http.put('/individu', {id})
      .then(() => this.fetchIndividu(1))
      this.editId = ''
    },
    fetchIndividu(page, searchQuery = ''){
      let url = `/individu/${this.pagesize}/${page}`

      if(page){
        if(!searchQuery){
          this.$http.get(url)
          .then(res => {
            this.individu = res.data.data
            this.cacheData = res.data.data
            this.links = {...res.data.links}
          })
        }else{
          this.$http.get(`${url}/${searchQuery}`)
          .then(res => {
            this.individu = res.data.data
            this.cacheData = res.data.data
            this.links = {...res.data.links}
          })
        }
      }
    },
    handleChange(value, key, column) {
      const newData = [...this.individu];
      const target = newData.filter(item => key == item.id)[0];
      if (target) {
        target[column] = value;
        this.individu = newData;
      }
    },edit(key) {
      const newData = [...this.individu]
      const target = newData.filter(item => key == item.id)[0];
      this.editId = key;
      if (target) {
        target.editable = true;
        this.individu = newData;
      }
    },
    handleSubmit() {
      if(this.form.kartukeluargaId){
        this.$http.post('/individu',{...this.form})
        .then(() => {
          this.fetchIndividu(1)
          this.showIndividuModal = false
          this.form = {}
        })
      }
    },
    cancel(key) {
      const newData = [...this.individu];
      const target = newData.filter(item => key === item.id)[0];
      const cacheData = this.cacheData
      this.editId = '';
      if (target) {
        Object.assign(target, cacheData.filter(item => key === item.id)[0]);
        delete target.editable;
        this.individu = newData;
      }
    },
  }
}
</script>

<style lang="scss">
.individuTable{
  width: 2550px;
}
</style>