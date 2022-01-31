import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Single from "../views/Single.vue";
import Activation from "../components/Activation"
import Profile from "../views/Profile"
import UsersList from "../views/UsersList"
import Category from "../views/Category"
import CreateArticle from "../views/CreateArticle"

Vue.use(VueRouter)

const routes = [
    {
        path: '/all',
        name: 'Home',
        component: Home,
    },
    {
        path: '/article/:id',
        name: 'Single',
        component: Single,
        props: true,
    },
    {
        path: '/category/:category',
        name: 'Category',
        component: Category,
        props: true,
    },
    {
        path: '/create',
        name: 'CreateArticle',
        component: CreateArticle,
        props: true,
        meta: {requiresAuth: true}
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
        path: '*',
        redirect: '/all'
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if(!to.matched[0]){
      router.push({ name: 'Home' });
    }
    else if(to.meta.requiresAuth){		
        localStorage.getItem('access') ? next() : router.push({ name: 'Home' })
    }
    else{
      next();
    }
})

const originalPush = router.push
router.push = function push(location, onResolve, onReject)
{
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject)
    }
 
    return originalPush.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            return err
        }
   
        return Promise.reject(err)
    })
}

export default router
