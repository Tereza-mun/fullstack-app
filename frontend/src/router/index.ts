import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '../pages/ProductsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductsPage
    }
  ]
})

export default router

