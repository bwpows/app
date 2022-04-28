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
      index: 0
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
          index: 1,
          title: 'bwpow'
        }
      },{
        path: '/work',
        name: 'Work',
        component: () => import('../views/app/Work.vue'),
        meta: {
          index: 1,
          title: '作品',
          keepAlive: true
        }
      },{
        path: '/account',
        name: 'Account',
        component: () => import('../views/app/Account.vue'),
        meta: {
          index: 1,
          title: '我的账号'
        }
      },{
        path: '/message',
        name: 'Message',
        component: () => import('../views/app/Message.vue'),
        meta: {
          index: 1,
          title: '我的消息'
        }
      },{
        path: '/publish',
        name: 'Publish',
        component: () => import('../views/app/Publish.vue'),
        meta: {
          index: 2,
          title: '发布作品'
        }
      },{
        path: '/work/:id',
        name: 'Work',
        component: () => import('../views/work/Info.vue'),
        meta: {
          index: 2,
          title: '作品详情'
        }
      },{
        path: '/account/info',
        name: 'AccountInfo',
        component: () => import('../views/account/Info.vue'),
        meta: {
          index: 2,
          title: '我的资料'
        }
      },{
        path: '/account/works',
        name: 'AccountWorks',
        component: () => import('../views/account/Works.vue'),
        meta: {
          index: 2,
          title: '我的作品'
        }
      },{
        path: '/account/likes',
        name: 'AccountLikes',
        component: () => import('../views/account/Likes.vue'),
        meta: {
          index: 2,
          title: '我的点赞'
        }
      },{
        path: '/account/privacy',
        name: 'AccountPrivacy',
        component: () => import('../views/account/Privacy.vue'),
        meta: {
          index: 2,
          title: '隐私作品'
        }
      },{
        path: '/account/collectes',
        name: 'AccountCollectes',
        component: () => import('../views/account/Collectes.vue'),
        meta: {
          index: 2,
          title: '我的关注'
        }
      },{
        path: '/account/phone',
        name: 'AccountPhone',
        component: () => import('../views/account/Phone.vue'),
        meta: {
          index: 2,
          title: '我的手机'
        }
      },{
        path: '/account/settings',
        name: 'AccountSettings',
        component: () => import('../views/account/Settings.vue'),
        meta: {
          index: 2,
          title: '通用设置'
        }
      },{
        path: '/safety/privacy',
        name: 'SafetyPrivacy',
        component: () => import('../views/safety/Privacy.vue'),
        meta: {
          index: 2,
          title: '用户协议和隐私策略'
        }
      },{
        path: '/safety/agreement',
        name: 'SafetyAgreement',
        component: () => import('../views/safety/Agreement.vue'),
        meta: {
          index: 2,
          title: '用户协议'
        }
      },{
        path: '/task/add',
        name: 'TaskAdd',
        component: () => import('../views/task/Add.vue'),
        meta: {
          index: 2, title: '创建任务'
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition){
      return savedPosition
    }
    if(from.keepAlive) {
      from.meta.savedPosition = document.body.scrollTop
    }
    return {
      x: 0,
      y: to.meta.savedPosition || 0,
    }
  }
})

router.beforeEach((to, from, next) => {
  if(to.path == '/signIn' || to.path == '/safety/privacy' || to.path=='/safety/Agreement') return next()
  if(!localStorage.getItem('token')) return next('signIn')
  next()
})


export default router
