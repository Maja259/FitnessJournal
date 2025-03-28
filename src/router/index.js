import {createRouter, createWebHistory} from 'vue-router';
import DashboardPage from "@/pages/DashboardPage.vue";
import FitnessPage from "@/pages/FitnessPage.vue";
import WorkoutPage from "@/pages/WorkoutPage.vue";
import Register from "@/components/Login/Register.vue";
import Login from "@/components/Login/Login.vue";
const routes=[
    {path:'/',component:DashboardPage, meta: { requiresAuth: true}},
    {path:'/fitness',component: FitnessPage,meta: { requiresAuth: true}},
    {path: '/workout',component: WorkoutPage,meta: { requiresAuth: true}},
    {path: '/register',component: Register},
    {path: '/login',component: Login},
];

const router = createRouter({
    history:createWebHistory(),routes
});
export default router;