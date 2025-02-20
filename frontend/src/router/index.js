import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import ReadyMadeMeals from '../views/ReadyMadeMeals.vue'
import MealKitsView from '../views/MealKitsView.vue'


const routes = [
  {
    path: '/home',
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
    // path:'/login',
    // name:'login',
    // component:LoginPage
  },
  {
    path:'/checkout',
    component:CheckoutView
  },
  {
    path:'/ready-made-meals',
    component: ReadyMadeMeals
  },
  {
    path:'/meal-kits',
    component: MealKitsView 
  },
  {
    path:'/cart',
    component: CartView
  },
  {
    path: '/delivery',
    component: DeliveryView
  },
  {
    path:'/supplier',
    component: SupplierView
  }
]
    

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});


export default router

