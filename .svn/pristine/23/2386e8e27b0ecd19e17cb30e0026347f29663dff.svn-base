import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { MessageBox } from 'element-ui'
import { getToken, getNewToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单


router.afterEach(() => {
  NProgress.done() // 结束Progress
})

router.beforeEach((to, from, next) => {
  let records = window.sessionStorage.getItem("records")
  if (records) {
    next()
  } else {
    //如果用户token不存在则跳转到login页面
    if (to.path === '/login') {
      next()
    } else if (to.path == '/aviation/authorized') {
      next()
    } else if (to.path == '/aviation/authorizedTwo') {
      next()
    } else {
      next('/login')
    }
  }
})
