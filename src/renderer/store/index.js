import Vue from 'vue'
import Vuex from 'vuex'
import * as Cookies from 'js-cookie';
import { createPersistedState } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ],
  state: {
    isAuthenticated: false,
    auth: {
      username: '',
      password: ''
    }
  },
  mutations:{
    login(state, payload){
      state.isAuthenticated = true 

      state.auth = payload
    },
    logout(state){
      state.isAuthenticated = false
      state.auth.username = ''
      state.auth.password = ''
    }
  },
  actions: {
    login({commit}, payload){
      commit('login', payload)
    },
    logout({commit}){
      commit('logout')
    }
  }
})
