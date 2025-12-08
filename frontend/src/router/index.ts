import { createRouter, createWebHistory } from 'vue-router'
import products from '../pages/products.vue'
import productDetail from '../pages/productDetail.vue'
import cartId from '../pages/cart/[id].vue'
import login from '../pages/login.vue'
import registerId from '../pages/register/[id].vue'
import profile from '../pages/profile.vue'
import verifyEmail from '../pages/verifyEmail.vue'
import { cartGuard, registerGuard, authGuard } from './guards'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
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
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      beforeEnter: authGuard
    },
    {
      path: '/verify-email',
      name: 'verifyEmail',
      component: verifyEmail
    }
  ]
})

export default router

