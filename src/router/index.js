import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: '/ItemMusic',
    name: 'itemMusic',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    // 组件内守卫
    beforeEnter: (to, from, next) => {
      if(store.state.isLogin){
        next()
      }else{
        next("/login")
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/InfoUser.vue')
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.afterEach((to, from) => {
  if(to.path=="/login"){
    store.state.footermusicshow=false
  }else{
    store.state.footermusicshow=true
  }
})

export default router
