import Vue from 'vue'
import Vuex from 'vuex'
import * as Cookies from 'js-cookie';
import { createPersistedState } from 'vuex-electron'
import axios from 'axios'
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
    },
    KK: undefined
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
    },
    fetchKk(state,payload){
      state.KK = payload
    }
  },
  actions: {
    login({commit}, payload){
      commit('login', payload)
    },
    logout({commit}){
      commit('logout')
    },
    fetchKk({commit}){
      axios.get('http://localhost:30258/vuex/kk')
        .then(res => {
          commit('fetchKk', res.data)
        })
    }
  }
})
