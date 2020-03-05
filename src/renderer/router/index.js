import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/views/Login').default
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
