import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: { title: '登录 - TaskHub', requiresAuth: false }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
            title: '我的工作台',
            requiresAuth: true,
            breadcrumb: '首页'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'
    // 需要登录并且未登录 → 去登录页
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    }
    // 如果已经登录，访问登录页面 → 跳转到首页
    else if(to.path === '/login' && isAuthenticated){
        next('/')
    }else{
        next()
    }
})

export default router
