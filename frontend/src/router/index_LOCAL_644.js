import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
    
    component: () => import( '../views/AboutView.vue')
  },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/delivery', name: 'Delivery', component: DeliveryView },
  { path: '/', name: 'Supplier', component: SupplierView }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
