import { createRouter, createWebHistory } from 'vue-router'
import products from '../pages/products.vue'
import productDetail from '../pages/productDetail.vue'
import cartId from '../pages/cart/[id].vue'
import login from '../pages/login.vue'
import registerId from '../pages/register/[id].vue'
import { cartGuard, registerGuard } from './guards'

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
      component: cartId,
      beforeEnter: cartGuard
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register/:id',
      name: 'register',
      component: registerId,
      beforeEnter: registerGuard
    }
  ]
})

export default router

