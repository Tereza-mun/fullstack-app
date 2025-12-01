import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../components/ProductList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList
    }
  ]
})

export default router

