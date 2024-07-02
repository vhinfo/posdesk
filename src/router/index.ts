import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import StoreSelectPage from '../views/StoreSelectPage.vue'
import CashierPage from '../views/CashierPage.vue'
import About from '../views/About.vue'
import Sales from '../views/SalesPage.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'Home', component: LoginPage },
  { path: '/store-selection', name: 'StoreSelect', component: StoreSelectPage},
  { path: '/about', name: 'About', component: About},
  { path: '/', name: 'Cashier', component: CashierPage},
  { path: '/sales', name: 'Sales', component: Sales},

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes
})

export default router
