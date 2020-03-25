<template>
  <main>
    <ViewNavbar/>  
    <a-table :columns="columns" :dataSource="users" rowKey="id"  :pagination="false">

      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations" style="display:flex" v-if="record.username != $store.state.auth.username">
          <a-popconfirm title="Hapus user ini?" @confirm="() => deleteUser(record.id)">
            <a style="margin:auto">
              <a-icon type="delete"/>
            </a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>

    <a-modal v-model="showModalUser" title="Tambah user baru" :footer="null">
      <a-form :form="form" layout="horizontal" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit.prevent="handleSubmit">
        <a-form-item 
        label="Username"
        >
          <a-input v-model="form.username" required/>
        </a-form-item>

        <a-form-item 
        label="Password"
        >
          <a-input-password v-model="form.password" required/>
        </a-form-item>

        <a-form-item 
        label="Ketik ulang password"
        :validate-status="err?'error': ''"
        :help="err"
        >
          <a-input-password v-model="form.passwordConfirmation" required/>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 2, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Simpan
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </main>
</template>

<script>
import ViewNavbar from '@/components/ViewNavbar'

const columns = [
  {
    title: 'Username',
    key: 'username',
    dataIndex: 'username'
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
  data(){
    return {
      columns,
      users: [],
      showModalUser: false,
      form: {
        username: '',
        password: '',
        passwordConfirmation: '',
      },
      err: ''
    }
  },
  mounted(){
   this.$root.$on('addItemToTabs',() => this.showModalUser = true)

    this.fetchUser()
  },
  methods: {
    fetchUser(){
      this.$http.get('/settings/admin')
      .then(res => this.users = res.data)
    },
    deleteUser(id){
      this.$http.delete(`/settings/${id}`)
      .then(() => this.fetchUser())
    },
    handleSubmit(){
      if(this.form.password === this.form.passwordConfirmation){
        this.$http.post('/user',{
          username: this.form.username,
          password: this.form.password,
        })
        .then(() => {
          this.form = {}
          this.showModalUser = false
          this.fetchUser()
        })
      }else{
        this.err = 'Password tidak sama'
      }
    }
  },
  components: {ViewNavbar}
}
</script>

<style>

</style>