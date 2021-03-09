import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Index.vue')
  },
  {
    path: '/city',
    name: 'City',
    component: () => import('../views/city/Index.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/detail/Index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 防止页面滚动影响其他页面
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0,left: 0 }
    }
  }
})

export default router
