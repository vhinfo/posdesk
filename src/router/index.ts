import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'

console.log("TESTE NO ROUTER");
const routes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'Home', component: LoginPage },
  { path: '/about', name: 'About', component: () => import('../views/About.vue')}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes
})

export default router
