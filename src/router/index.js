import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../layouts/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '',
    component: Index,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },{
        path: '/blog/add',
        name: 'AddBlog',
        component: () => import('../views/blog/Add.vue')
      },{
        path: '/blog/info/:id',
        name: 'InfoBlog',
        component: () => import('../views/blog/Info.vue')
      },{
        path: '/account/center',
        name: 'AccountCenter',
        component: () => import('../views/account/Center.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if(to.path == '/signIn' || to.path == '/signUn') return next()
  if(!localStorage.getItem('token')) return next('signIn')
  next()
})


export default router
