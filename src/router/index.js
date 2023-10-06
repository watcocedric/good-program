// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/SZm8eHzaqdaae0N82mSOFQ92fvT7GhRBJjCUDwXuKmXvSRDtLXva38DCQpwcwOWLOdVbhCqa2X2vbt4W9J9i0RdPY3fk5dT3BlbkFJtAkVToMogA5WZIkg1Ppgaae0N82mSOFQ92fvT7GhRBJjCUDwXuKmXvSRDtLXva38DCQpwcwOWLOdVbhCqa2X2vbt4W9J9i0RdPY3fk5dT3BlbkFJtAkVToMogA5WZIkg1Ppg',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/spam',
    component: () => import('@/views/Spam.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
