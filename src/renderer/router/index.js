import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: require('@/views/Login').default,
      meta:{
        login: true
      }
    },
    {
      path: '/beranda',
      name: 'Beranda',
      component: require('@/views/Beranda').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/views/TestPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
