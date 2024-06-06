import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/HomePage',
    component: Layout,
    children: [{
      path: '/HomePage',
      name: '我的地盘',
      component: () => import('@/views/HomePage/index'),
      meta: { title: '我的地盘', icon: 'el-icon-user' },
    },

    ]
  },
  {
    path: '/details',
    component: Layout,
    children: [{
      path: '/details/:userId?',
      name: 'details',
      component: () => import('@/views/HomePage/children/index'),
    }]
  },
  {
    path: '/personal',
    component: Layout,
    children: [{
      path: '/personal',
      name: 'personal',
      component: () => import('@/views/personal/index'),
    }]
  },
  {
    path: '/inform',
    component: Layout,
    children: [{
      path: '/inform',
      name: 'inform',
      component: () => import('@/views/inform/index'),
    }]
  },
  {
    path: '/aviation',
    component: Layout,
    name: '项目管理',
    meta: {
      title: '项目管理',
      icon: 'el-icon-document-copy'
    },
    children: [
      {
        path: 'reference',
        name: '备案',
        component: () => import('@/views/aviation/reference/index'),
        meta: { title: '备案', icon: 'el-icon-document' },
      },
      {
        path: "summary",
        name: "汇总表",
        component: () => import("@/views/aviation/summary/index"),
        meta: { title: "汇总表", icon: "el-icon-document" },
      },
      {
        path: "record",
        name: "备案表",
        component: () => import("@/views/aviation/record/index"),
        meta: { title: "备案表", icon: "el-icon-document" },
      },
      {
        path: 'offerstatistics',
        name: 'offerstatistics',
        component: () => import('@/views/aviation/offerstatistics/index.vue'),
      },
      {
        path: 'monthlystatistical',
        name: 'monthlystatistical',
        component: () => import('@/views/aviation/monthlystatistical/index.vue'),
      },
      {
        path: "information",
        name: "项目信息",
        component: () => import("@/views/aviation/information/index"),
        meta: { title: "项目信息", icon: "el-icon-document" },
      },
      {
        path: "ReportSta",
        name: "报告情况统计",
        component: () => import("@/views/aviation/ReportSta/index"),
        meta: { title: "报告情况统计", icon: "el-icon-document" },
      },
      {
        path: 'authorized',
        name: '编制',
        component: () => import('@/views/aviation/authorized/index'),
      },
      {
        path: 'authorizedTwo',
        name: '编制',
        component: () => import('@/views/aviation/authorizedTwo/index'),
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/personal/index'),
      },
      {
        path: 'inform',
        name: 'inform',
        component: () => import('@/views/inform/index'),
      },
      {
        path: 'usagetype',
        name: 'usagetype',
        component: () => import('@/views/usagetype/index.vue'),
        meta: { title: '公章使用记录', icon: 'el-icon-coordinate' }
      },
      {
        path: 'cement',
        name: 'cement',
        component: () => import('@/views/cement/Index.vue'),
        meta: { title: '公告管理', icon: 'el-icon-tickets' }
      },
      {
        path: 'refundledger',
        name: 'refundledger',
        component: () => import('@/views/aviation/refundledger/index.vue'),
      },
      {
        path: 'quotation',
        name: 'quotation',
        component: () => import('@/views/aviation/quotation/index.vue'),
      },
      {
        path: 'handling',
        name: 'handling',
        component: () => import('@/views/aviation/handling/index.vue'),
      },

    ]

  },

  {
    path: '/dataquery',
    component: Layout,
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user', roles: ['guanliyuan'] }
      },
      {
        path: 'cement',
        name: 'cement',
        component: () => import('@/views/cement/Index.vue'),
        meta: { title: '公告管理', icon: 'el-icon-tickets' }
      },
      {
        path: 'stamp',
        name: 'stamp',
        component: () => import('@/views/stamp/index.vue'),
        meta: { title: '公章管理', icon: 'el-icon-coordinate' }
      },
      {
        path: 'usage',
        name: 'usage',
        component: () => import('@/views/usage/index.vue'),
        meta: { title: '用章登记', icon: 'el-icon-coordinate' }
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/personal/index'),
      },
      {
        path: 'inform',
        name: 'inform',
        component: () => import('@/views/inform/index'),
      },
      {
        path: "configuration",
        name: "configuration",
        component: () => import("@/views/configuration/index.vue"),
      },
      {
        path: 'peoplestatistics',
        name: 'peoplestatistics',
        component: () => import('@/views/peoplestatistics/index.vue'),
      },
      {
        path: 'facilitystatistics',
        name: 'facilitystatistics',
        component: () => import('@/views/facilitystatistics/index.vue'),
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
