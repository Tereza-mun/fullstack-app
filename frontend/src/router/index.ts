import { createRouter, createWebHistory } from 'vue-router'
import products from '../pages/products.vue'
import productDetail from '../pages/productDetail.vue'
import cartId from '../pages/cart/[id].vue'
import login from '../pages/login.vue'
import registerId from '../pages/register/[id].vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: products
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      component: productDetail
    },
    {
      path: '/cart/:id',
      name: 'cart',
      component: cartId
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register/:id',
      name: 'register',
      component: registerId
    }
  ]
})

export default router

