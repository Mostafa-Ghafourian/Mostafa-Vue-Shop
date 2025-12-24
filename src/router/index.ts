import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/Authorization',
      name: 'Authorization',
      component: () => import('@/views/Authorization.vue'),
    },
    {
      path: '/Basket',
      name: 'BasketPage',
      component: () => import('@/views/Basket.vue')
    }
  ],
})

export default router
