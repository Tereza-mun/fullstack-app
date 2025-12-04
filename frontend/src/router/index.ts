import { createRouter, createWebHistory } from 'vue-router'
import products from '../pages/products.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: products
    }
  ]
})

export default router

