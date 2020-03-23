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
            :key="attr.id"
            :attribute="attr">
            <span>
              {{ attr.customData.description }} 
              <a-popconfirm title="Hapus jadwal ini?" @confirm="() => deleteTodos(attr.customData.id)">
                <a-icon type="delete" theme="filled" style="margin-left:auto" class="pointer" v-if="attr.customData.description"/>
              </a-popconfirm>
            </span>
            
          </popover-row>
            <span>
               <input type="text" class="inputTodo" placeholder="Jadwal baru..." v-model="addTodo" /><a-icon v-show="addTodo" type="check" class="pointer" @click="saveTodos"/>
            </span>
      </div>
    </vc-calendar>
  </div>
</template>

<script>
import NavigationBar from '@/components/Navigationbar'
import PopoverRow from 'v-calendar/lib/components/popover-row.umd.min'
import moment from 'moment';
import 'moment/locale/id';

export default {
  name: 'DKMMaster',
  data(){
    return {
      selectedDay: {},
      addTodo:'',
      todos: []
    }
  },
  methods: {
    handler(id){
      alert(id)
    },
    saveTodos(){
      this.$http.post('/todos',{description: this.addTodo, dates: this.selectedDay.dates})
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
      // console.log(e);
      
      if(!e.attributes){
        this.selectedDay = {
          dates: new Date(e.id),
          popover: {
            description: 'lol',
            placement: 'bottom',
            visibility: 'click',
            isInteractive: true
          },
          customData: {
            id: 'input',
            date: new Date(e.id)
          }
        }
      }
    }
  },
  computed: {
    attributes() {
      return [
        // Attributes for todos
        this.selectedDay,
        ...this.todos.map(todo => ({
          dates: todo.dates,
          dot: 'green',
          popover: {
            label: todo.description,
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
}

.inputTodo{
  background: none !important;
  border: none !important;
}

.weekday-position-7{
  color: red !important
}
</style>
