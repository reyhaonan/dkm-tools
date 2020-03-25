<template>
  <div id="app">
    <navigation-bar v-if="!$route.meta.login"/>
    <router-view class="view rounded shadow bg-white"></router-view>
    <vc-calendar id="calendars" v-if="!$route.meta.login" :attributes="attributes" locale="id" @daymouseenter="daymouseenter" :first-day-of-week="2">
      <div slot="day-popover" slot-scope="{ day, dayTitle, attributes }" >
        <div style="text-align:center">
        {{ dayTitle }}
        </div>
          <popover-row
            v-for="attr in attributes"
            :key="attr.customData.id"
            :attribute="attr">
            <span v-if="attr.customData.id != 1" class="pointer">
              <a-popconfirm title="Hapus jadwal ini?" @confirm="() => deleteTodos(attr.customData.id)">
                {{attr.customData.description}}
                <!-- <a-icon type="delete" theme="filled" class="pointer"/> -->
              </a-popconfirm>
            </span>
            
          </popover-row>
            <span >
              <a-input size="small" class="inputTodo" placeholder="Jadwal baru..." v-model="addTodo" style="margin-top:.5rem" @pressEnter="saveTodos">
                <a-icon v-show="addTodo" type="check" class="pointer" @click="saveTodos" slot="suffix"/>
              </a-input>
            </span>
      </div>
    </vc-calendar>
  </div>
</template>

<script>
import NavigationBar from '@/components/Navigationbar'
import PopoverRow from 'v-calendar/lib/components/popover-row.umd.min'
import moment from 'moment';
moment.locale('id')

export default {
  name: 'DKMMaster',
  data(){
    return {
      selectedDate: undefined,
      addTodo:'',
      todos: []
    }
  },
  methods: {
    handler(id){
      alert(id)
    },
    saveTodos(){
      this.$http.post('/todos',{description: this.addTodo, dates: this.selectedDate})
      .then(() => {
        this.fetchTodos()
        this.addTodo = ''
      })
    },
    fetchTodos(){
      this.$http.get('/todos')
      .then(res => this.todos = res.data)
    },
    deleteTodos(id){
      this.$http.delete(`/todos/${id}`)
      .then(() => this.fetchTodos())
    },
    daymouseenter(e){
        this.selectedDate = new Date(e.id)
    },
  },
  computed: {
    attributes() {
      return [
        // Attributes for todos
        {
          dates: {weekdays: [1,2,3,4,5,6,7]},
          popover: {
            visibility: 'click'
          },
          customData:{id: '1'}
        },
        ...this.todos.map(todo => ({
          dates: todo.dates,
          dot: 'green',
          popover: {
            description: todo.description,
            visibility: 'click',
            isInteractive: true
          },
          customData: todo,
        })),
        
      ]
    },
  },
  components: {
    NavigationBar,
    PopoverRow
  },
  updated: function () {
    this.$nextTick(function () {
      var e = document.getElementById("calendars").classList
      e.remove("vc-border")
      e.add("shadow")
    })
  },
  mounted(){
    this.$electron.ipcRenderer.on('navigate', (e, routePath) => {
      this.$router.push(routePath)
    })

    this.fetchTodos()

    this.$store.dispatch('fetchKk')
  }
}
</script>

<style lang="scss">
#app{
  display: flex;
  justify-content: space-between;
}

.view{
  flex-basis: calc(100% - 222px - 256px - 4rem);
  padding: 0 2rem 2rem 2rem;
  height: calc(100vh - 2rem);
  overflow: auto;
}

#calendars{
  max-height: 270px;
  // z-index: 988;
}

.inputTodo{
  background: none !important;
  border: none !important;
  color: white !important;
}

.weekday-position-7{
  color: red !important
}
</style>
