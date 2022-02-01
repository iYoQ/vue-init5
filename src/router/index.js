import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SingleArticle from "../views/SingleArticle"
import SingleNews from "../views/SingleNews"
import Activation from "../components/Activation"
import Profile from "../views/Profile"
import UsersList from "../views/UsersList"
import CreateArticle from "../views/CreateArticle"
import News from "../views/News"
import CreateNews from "../views/CreateNews"

Vue.use(VueRouter)

const routes = [
    {
        path: '/all',
        name: 'Home',
        component: Home,
        props: true,
    },
    {
        path: '/article/:id',
        name: 'SingleArticle',
        component: SingleArticle,
        props: true,
    },
    {
        path: '/news/:id',
        name: 'SingleNews',
        component: SingleNews,
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
        path: '/create_news',
        name: 'CreateNews',
        component: CreateNews,
        props: true,
        meta: {isNewsmaker: true}
    },
    {
        path: '/news',
        name: 'News',
        component: News,
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
