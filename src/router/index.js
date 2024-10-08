import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CrudView from '@/views/CrudView.vue'
import EditView from '@/views/EditView.vue'

const routes = [
  {
    path: '/',
    name:'login',
    component: LoginView
  },
  {
    path: '/registro',
    name: 'registro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistroView.vue')
  },
  {
    path: '/home',
    name:'home',
    component: HomeView
  },
  {
    path: '/crud',
    name:'crud',
    component: CrudView
  },
  {
    path: '/edit',
    name:'edit',
    component: EditView,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
