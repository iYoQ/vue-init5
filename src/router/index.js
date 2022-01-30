import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Single from "../views/Single.vue";
import Activation from "../components/Activation"
import Profile from "../views/Profile"
import UsersList from "../views/UsersList"
import Category from "../views/Category"

Vue.use(VueRouter)

const routes = [
    {
        path: '/all',
        name: 'Home',
        component: Home,
    },
    {
        path: '/articles/:id',
        name: 'Single',
        component: Single,
        props: true,
    },
    {
        path: '/articles/category/:category',
        name: 'Category',
        component: Category,
        props: true,
    },
    {
        path: '/auth/activation',
        name: 'Activation',
        component: Activation,
        props: true,
    },
    {
        path: '/users/:username',
        name: 'Profile',
        component: Profile,
        props: true,
    },
    {
        path: '/users/',
        name: 'UsersList',
        component: UsersList,
        props: true,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '*',
        redirect: '/all'
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
