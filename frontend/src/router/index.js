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
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue';
import ReturnPolicyView from '@/views/ReturnPolicyView.vue';
import ShoppingandDeliveryView from '@/views/ShoppingandDeliveryView.vue';
import TermsAndConditionsView from '@/views/TermsAndConditionsView.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/SignupPage',
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
    path:'/privacy-policy',
    name:'privacy-policy',
    component:PrivacyPolicyView
  },
  {
    path:'/return-policy',
    name:'/return-policy',
    component:ReturnPolicyView
  },
  {
    path:'/shopping-and-delivery',
    name:'shopping-and-delivery',
    component:ShoppingandDeliveryView
  },
  {
    path:'/terms-and-conditions',
    name:'terms-and-conditions',
    component:TermsAndConditionsView
  }
]
    

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});


export default router

