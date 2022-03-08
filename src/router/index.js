import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../layouts/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
    meta: {
      level: 0
    }
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: {
      level: 0
    }
  },
  {
    path: '',
    component: Index,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          level: 1
        }
      },{
        path: '/publish',
        name: 'Publish',
        component: () => import('../views/Publish.vue'),
        meta: {
          level: 1
        }
      },{
        path: '/account',
        name: 'Account',
        component: () => import('../views/Account.vue'),
        meta: {
          level: 1
        }
      },{
        path: '/message',
        name: 'Message',
        component: () => import('../views/Message.vue'),
        meta: {
          level: 1
        }
      },{
        path: '/blog/info/:id',
        name: 'InfoBlog',
        component: () => import('../views/blog/Info.vue'),
        meta: {
          level: 2,
          title: '博客详情'
        }
      },{
        path: '/account/works',
        name: 'AccountWorks',
        component: () => import('../views/account/Works.vue'),
        meta: {
          level: 2,
          title: '我的作品'
        }
      },{
        path: '/account/likes',
        name: 'AccountLikes',
        component: () => import('../views/account/Likes.vue'),
        meta: {
          level: 2,
          title: '我的点赞'
        }
      },
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
