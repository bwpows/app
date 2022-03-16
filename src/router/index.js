import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../layouts/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('../views/session/SignIn.vue'),
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
        component: () => import('../views/app/Home.vue'),
        meta: {
          level: 1
        }
      },{
        path: '/publish',
        name: 'Publish',
        component: () => import('../views/app/Publish.vue'),
        meta: {
          level: 1
        }
      },{
        path: '/account',
        name: 'Account',
        component: () => import('../views/app/Account.vue'),
        meta: {
          level: 1
        }
      },{
        path: '/message',
        name: 'Message',
        component: () => import('../views/app/Message.vue'),
        meta: {
          level: 1
        }
      },{
        path: '/work/:id',
        name: 'Work',
        component: () => import('../views/work/Info.vue'),
        meta: {
          level: 2,
          title: '作品详情'
        }
      },{
        path: '/account/info',
        name: 'AccountInfo',
        component: () => import('../views/account/Info.vue'),
        meta: {
          level: 2,
          title: '我的资料'
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
      },{
        path: '/account/collectes',
        name: 'AccountCollectes',
        component: () => import('../views/account/Collectes.vue'),
        meta: {
          level: 2,
          title: '我的关注'
        }
      },{
        path: '/account/phone',
        name: 'AccountPhone',
        component: () => import('../views/account/Phone.vue'),
        meta: {
          level: 2,
          title: '我的手机'
        }
      },{
        path: '/account/settings',
        name: 'AccountSettings',
        component: () => import('../views/account/Settings.vue'),
        meta: {
          level: 2,
          title: '我的手机'
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path == '/signIn' || to.path == '/signUn') return next()
  if(!localStorage.getItem('token')) return next('signIn')
  next()
})


export default router
