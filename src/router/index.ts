import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/products/ProductListView.vue'),
    },
    {
      path: '/Authorization',
      name: 'Authorization',
      component: () => import('@/views/authorization/Authorization.vue'),
    },
    {
      path: '/Basket',
      name: 'BasketPage',
      component: () => import('@/views/basket/Basket.vue')
    }
  ],
})

export default router
