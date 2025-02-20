import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import Login from '@/views/Login.vue'
import LoginPage from '@/components/LoginPage.vue'
// import CheckOut from '@/views/CheckoutView.vue' 
// import CheckoutView from '@/views/CheckoutView.vue'
import Checkout from '../views/CheckoutView.vue';
// import Cart from '../views/Cart.vue';
import ReadyMadeMeals from '@/views/ReadyMadeMeals.vue'
import MealKitsView from '../views/MealKitsView.vue'
import CartView from '../views/CartView.vue';
import DeliveryView from '../views/DeliveryView.vue';
import SupplierView from '../views/SupplierView.vue';


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
    path:'/login',
    name:'login',
    component:LoginPage
  },
  {
    path:'/checkout',
    name:'checkout',
    component:Checkout
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
    
//     component: () => import( '../views/AboutView.vue')
//   },
//   { path: '/cart', name: 'Cart', component: CartView },
//   { path: '/delivery', name: 'Delivery', component: DeliveryView },
//   { path: '/', name: 'Supplier', component: SupplierView }
// ];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});


export default router

