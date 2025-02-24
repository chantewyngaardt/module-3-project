import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import SigninView from '@/views/SigninView.vue';
//import Checkout from '../views/CheckoutView.vue';
import ReadyMadeMeals from '@/views/ReadyMadeMeals.vue'
import MealKitsView from '../views/MealKitsView.vue'
import CartView from '../views/CartView.vue'
import DeliveryView from '../views/DeliveryView.vue'
import SupplierView from '../views/SupplierView.vue'
import ClientDeliInterfaceView from '@/views/ClientDeliInterfaceView.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/SignupPAge',
    name: 'SignupPage',
    component: SignupView
  },
  {
    path: '/SigninPage',
    name: 'SigninPage',
    component: SigninView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  //{
   // path:'/checkout',
    //component:CheckoutView
  //},
  {
    path: '/ready-made-meals',
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
    name: 'delivery',
    component: DeliveryView
  },
  {
    path:'/supplier',
    name:'supplier',
    component: SupplierView
  },
  {
    path: '/',
    name: 'client-delivery-interface',
    component: ClientDeliInterfaceView
  }
]
    

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});


export default router

