import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'
import VTooltip from 'v-tooltip'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less';
Vue.use(Antd);



Vue.use(VTooltip)
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:30258'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')


import { remote } from 'electron'

remote.globalShortcut.register('CommandOrControl+Shift+K', () => {
  remote.BrowserWindow.getFocusedWindow().webContents.openDevTools()
})

window.addEventListener('beforeunload', () => {
  remote.globalShortcut.unregisterAll()
})