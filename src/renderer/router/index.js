import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
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
      path: '/data',
      name: 'Data warga',
      component: require('@/views/DataWarga').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/views/TestPage').default
    },
    {
      path: '*',
      redirect: '/beranda'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router