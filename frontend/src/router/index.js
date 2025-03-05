import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignupView from '../views/SignupView.vue';
import SigninView from '@/views/SigninView.vue';
import ReadyMadeMeals from '@/views/ReadyMadeMeals.vue'
import MealKitsView from '../views/MealKitsView.vue'
import CartView from '../views/CartView.vue'
import DeliveryView from '../views/DeliveryView.vue'
import SupplierView from '../views/SupplierView.vue'
import CheckoutView from '@/views/CheckoutView.vue';
import ClientDeliInterfaceView from '@/views/ClientDeliInterfaceView.vue';
import LogoutView from '@/views/LogoutView.vue';
import UserId from '@/views/UserId.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupView
  },
  {
    path: '/login',
    name: 'SigninPage',
    component: SigninView
  },
  {
    path:'/checkout',
    name:'checkout',
    component: CheckoutView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
   path:'/checkout',
   name: '/checkout',
    component:CheckoutView
  },
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
    path: '/client-delivery-interface',
    name: 'client-delivery-interface',
    component: ClientDeliInterfaceView
  },
  {
    path: "/logout",
    component: LogoutView
  },
  {
    path: "/userid",
    component: UserId
  }
]
    

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});


export default router

