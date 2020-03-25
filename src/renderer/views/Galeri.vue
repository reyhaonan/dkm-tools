<template>
  <main>
    <ViewNavbar/>

    <a-upload-dragger
    name="file"
    :multiple="true"
    :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">Pilih file atau drag and drop ke area ini</p>
    </a-upload-dragger>

    <a-button 
    :disabled="fileList.length === 0"
    :loading="uploading" 
    type="primary" 
    @click.prevent="handleUpload" 
    block>
      {{uploading ? 'Uploading' : 'Upload' }}
    </a-button>

    <a-timeline mode="alternate" style="margin-top:1rem">
      <a-timeline-item v-for="gambar in galeri" :key="gambar.id">
        <span>{{ moment(gambar.createdAt).fromNow() }}</span>
        <a-popconfirm title="Hapus gambar ini?" @confirm="() => deleteGaleri(gambar)">
          <a-icon type="delete" />
        </a-popconfirm>
        <img :src="'../../../../' + gambar.path" style="width:100%;margin-top:1rem" draggable="false"><!-- Production -->
        <!-- <img :src="gambar.path" style="width:100%;margin-top:1rem" draggable="false">Development -->
        
      </a-timeline-item>
    </a-timeline>


    
  </main>
</template>

<script>
import ViewNavbar from '@/components/ViewNavbar'
import moment from 'moment'


moment.locale('id')
export default { 
  components:{
    ViewNavbar
  },
  data() {
    return {
      moment,
      fileList: [],
      uploading: false,
      galeri: []
    };
  },
  mounted(){
    this.fetchGaleri()
  },
  methods: {
    fetchGaleri(){
      this.$http.get('/galeri')
      .then(res => this.galeri = res.data)
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('Hanya file gambar');
        this.handleRemove(file)
      }
      return false;
    },
    handleUpload() {
      const { fileList } = this;
      
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('fileList', file);
      });
      this.uploading = true;
      this.$http.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        this.fileList = []
        this.fetchGaleri()
        this.uploading = false
      })
    },
    deleteGaleri(photo){
      this.$http.put(`/galeri`,photo)
      .then(() => this.fetchGaleri())
    }
  },
}
</script>

<style lang="scss">
.ant-upload{
  width: 100%;height: 200px !important
}
</style>