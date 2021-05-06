import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Layout from '@/layout/layout'

Vue.use(Router)

/**
 * 关于 route 的配置属性说明：
 *
 * alwaysShow: true       // if set true, will always show the root menu, whatever its child routes length
 *                        // if not set alwaysShow, only more than ont route under the children
 *                        // it will becomes nested mode, otherwise not show the root menu
 *                        // 如果设置为true,它将总是出现在根目录。如果不设置的话，当它只有1个子路由的时候，会把
 *                        // 它的唯一子路由放到跟目录上来，而不显示它自己本身。
 *
 * hidden: true           // if set ture, 将不会出现在左侧菜单栏中
 */

/**
 * 基础路由： 任何角色都包含的路由
 * @type {Array}
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/home',
    // hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/homepage'),
        meta: {icon: 's-home', title: '股价预测系统首页'}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    meta: {
      icon: 'tickets',
      title: '个人中心'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/user/profile'),
        meta: {icon: 'warning', title: '个人中心'}
      }
    ]
  },
  {
    path: '/socket-market',
    component: Layout,
    meta: {
      icon: 'question',
      title: '股票行情'
    },
    redirect: '/socket-market/index',
    children: [
      {
        path: 'index',
        name: 'socketMarket',
        component: () => import('@/views/socket-market/index'),
        meta: {icon: 'guide', title: '股票行情'}
      }
    ]
  },
  {
    path: '/socket-predict',
    component: Layout,
    alwaysShow: true,
    meta: {
      icon: 's-order',
      title: '股票预测'
    },
    redirect: 'socket-predict',
    children: [
      {
        path: 'report-propensity-prediction',
        name: 'report-propensity-prediction',
        component: () => import('@/views/socket-predict/report-propensity-prediction'),
        meta: {icon: 's-order', title: '报告倾向性预测'}
      },
      {
        path: 'socket-predict',
        name: 'socket-predict',
        component: () => import('@/views/socket-predict/index'),
        meta: {icon: 'svg-type', title: '股票预测'}
      }
    ]
  },
  {
    path: '/user-center',
    component: Layout,
    meta: {
      icon: 'question',
      title: '个人中心'
    },
    redirect: '/socket-market/index',
    children: [
      {
        path: 'index',
        name: 'socketMarket',
        component: () => import('@/views/socket-market/index'),
        meta: {icon: 'guide', title: '个人中心'}
      }
    ]
  },
  {
    path: '/concat',
    component: Layout,
    meta: {
      icon: 'question',
      title: '联系我们'
    },
    redirect: '/socket-market/index',
    children: [
      {
        path: 'index',
        name: 'socketMarket',
        component: () => import('@/views/socket-market/index'),
        meta: {icon: 'guide', title: '联系我们'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history',  require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/**
 * 动态路由： 根据用户角色
 * @type {Array}
 */
export const asyncRouterMap = [

  { path: '*', redirect: '/404', hidden: true }
]
