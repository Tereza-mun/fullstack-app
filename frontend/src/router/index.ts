import { createRouter, createWebHistory } from 'vue-router'
import products from '../pages/products.vue'
import cart from '../pages/cart.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: products
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    }
  ]
})

export default router

