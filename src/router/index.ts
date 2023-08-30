import { createRouter, createWebHashHistory } from 'vue-router'
export const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  }

]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})
export default router
