import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import Login from '@/views/Login.vue'
import LoginPage from '@/components/LoginPage.vue'
import ReadyMadeMeals from '@/views/ReadyMadeMeals.vue'
import MealKitsView from '@/views/MealKitsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/login',
    name:'login',
    component:LoginPage
  },
  {
    path:'/ready-made-meals',
    component: ReadyMadeMeals
  },
  {
    path:'/meal-kits',
    component: MealKitsView 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
