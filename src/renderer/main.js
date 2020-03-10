import Vue from 'vue'
import axios from 'axios'
import { rendererPreload } from 'electron-routes';
import App from './App'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import VueProgressBar from 'vue-progressbar'
const options = {
  color: '#45B161',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  inverse: false
}

Vue.use(VueProgressBar, options)
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios.create({
  baseURL: 'app://api/'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')



rendererPreload();