import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    { path: '/', name:'home', component: () => import ('@/views/HomeDashboard.vue')},
    { path: '/about', name:'about', component: () => import('@/views/About.vue') },
    { path: '/:pathMatch(.*)*', name:'NotFound', component: () => import('@/views/Notfound.vue')},
    { path: '/dispositivos',name: 'dispositivos', component: () => import('@/views/Dispositivos.vue')}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;