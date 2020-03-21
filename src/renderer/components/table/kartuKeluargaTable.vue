<template>
  <div>
    <a-table :columns="columns" :dataSource="kk" rowKey="id" :scroll="{x:2000}" :pagination="false">
      <template
        v-for="col in ['noKk','kepalaKeluarga','alamat','provinsi','kabupaten','kecamatan','desa','kodePos','rt','rw','ket']"
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
          <template v-else
            >{{text}}</template
          >
        </div>
      </template>

      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations" style="display:flex">
          <span v-if="record.editable">
            <a-icon type="save"  @click="() => saveEditedKk(record.id)" style="margin:auto"/>
            <a-popconfirm title="Yakin ingin membatalkan?" @confirm="() => cancel(record.id)">
              <a-icon type="close" class="pointer" style="margin:auto"/>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editId !== ''" @click="() => edit(record.id)" style="margin:auto">
              <a-icon type="edit" />
            </a>
          </span>
          <a-popconfirm title="Hapus data ini?" @confirm="() => deleteKk(record.id)">
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


    <a-modal v-model="showKkModal" title="Tambah kartu keluarga baru" :footer="null" style="top: 36px;">
      <a-form :form="form" layout="horizontal" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit.prevent="handleSubmit">
        <a-form-item label="Nomor KK">
          <a-input v-model="form.noKk" />
        </a-form-item>
        <a-form-item label="Nama kepala keluarga">
          <a-input v-model="form.kepalaKeluarga" />
        </a-form-item>
        <a-input-group>
          <a-form-item label="RT" :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
            <a-input v-model="form.rt" />
          </a-form-item>
          <a-form-item label="RW" :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
            <a-input v-model="form.rw" />
          </a-form-item>
        </a-input-group>
        <a-form-item label="Kode pos">
          <a-input v-model="form.kodePos" />
        </a-form-item>
        <a-form-item label="Desa">
          <a-input v-model="form.desa" />
        </a-form-item>
        <a-form-item label="Kecamatan">
          <a-input v-model="form.kecamatan" />
        </a-form-item>
        <a-form-item label="Kabupaten">
          <a-input v-model="form.kabupaten" />
        </a-form-item>
        <a-form-item label="Provinsi">
          <a-input v-model="form.provinsi" />
        </a-form-item>
        <a-form-item label="Alamat">
          <a-textarea v-model="form.alamat" autoSize />
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

const columns = [
  {
    title: 'Nomor KK',
    dataIndex: 'noKk',
    key: 'noKk',
    scopedSlots: { customRender: 'noKk' }
  },
  {
    title: 'Kepala keluarga',
    dataIndex: 'kepalaKeluarga',
    key: 'kepalaKeluarga',
    scopedSlots: { customRender: 'kepalaKeluarga' }
  },
  {
    title: 'Alamat',
    dataIndex: 'alamat',
    key: 'alamat',
    scopedSlots: { customRender: 'alamat' }
  },
  {
    title: 'Provinsi',
    dataIndex: 'provinsi',
    key: 'provinsi',
    scopedSlots: { customRender: 'provinsi' }
  },
  {
    title: 'Kabupaten',
    dataIndex: 'kabupaten',
    key: 'kabupaten',
    scopedSlots: { customRender: 'kabupaten' }
  },
  {
    title: 'Kecamatan',
    dataIndex: 'kecamatan',
    key: 'kecamatan',
    scopedSlots: { customRender: 'kecamatan' }
  },
  {
    title: 'Desa',
    dataIndex: 'desa',
    key: 'desa',
    scopedSlots: { customRender: 'desa' }
  },
  {
    title: 'Kode pos',
    dataIndex: 'kodePos',
    key: 'kodePos',
    scopedSlots: { customRender: 'kodePos' }
  },
  {
    title: 'RT',
    dataIndex: 'rt',
    key: 'rt',
    scopedSlots: { customRender: 'rt' }
  },
  {
    title: 'RW',
    dataIndex: 'rw',
    key: 'rw',
    scopedSlots: { customRender: 'rw' }
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

]

export default {
  name: 'kartuKeluargaTable',
  components:{ VueContext },
  data(){
    return {
      columns,
      kk: [],
      editId: '',
      cache: undefined,
      showKkModal: false,
      pagesize: 10,
      form: {
        noKk: '',
        kepalaKeluarga: '',
        alamat: '',
        rt: '',
        rw: '',
        desa: '',
        kecamatan: '',
        kabupaten: '',
        kodePos: '',
        provinsi: '',
        ket: '',
      },
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
      if(tabs == 1)this.showKkModal = true
    })


    this.fetchKk(1)
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
    onPaginationChange(page, pagesize){
      this.fetchKk(page)
    },
    onShowSizeChange(current, size){
      this.pagesize = size
      this.fetchKk(current)
      
    },
    saveEditedKk(id){
      const target = {...this.kk.filter(item => id === item.id)[0]}
      delete target.id
      
      this.$http.post('/editkk', {data: target,id:id})
      .then(() => {
        delete target.editable
        this.editId = ''
        this.fetchKk(1)
        this.$store.dispatch('fetchKk')
      })
    },
    deleteKk(id){
      this.$http.put('/kk', {id})
      .then(() => this.fetchKk(1))
      this.editId = ''
    },
    fetchKk(page){
      let url = `/kk/${this.pagesize}/${page}`

      if(page){
        this.$http.get(url)
        .then(res => {
          this.kk = res.data.data
          this.cacheData = res.data.data
          this.links = {...res.data.links}
        })
        .catch(err => console.error(err))
      }else{
        return
      }
    },
    handleChange(value, key, column) {
      const newData = [...this.kk];
      const target = newData.filter(item => key === item.id)[0];
      if (target) {
        target[column] = value;
        this.kk = newData;
      }
    },
    edit(key) {
      const newData = [...this.kk]
      const target = newData.filter(item => key === item.id)[0];
      this.editId = key;
      if (target) {
        target.editable = true;
        this.kk = newData;
      }
    },
    handleSubmit() {
      this.$http.post('/kk',{...this.form})
      .then(() => {
        this.fetchKk(1)
        this.showKkModal = false
        this.form = {}
        this.$store.dispatch('fetchKk')
      })
    },
    cancel(key) {
      const newData = [...this.kk];
      const target = newData.filter(item => key === item.id)[0];
      const cacheData = this.cacheData
      this.editId = '';
      if (target) {
        Object.assign(target, cacheData.filter(item => key === item.id)[0]);
        delete target.editable;
        this.kk = newData;
      }
    },
  }
}
</script>
