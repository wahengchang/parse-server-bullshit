import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Secret from '../views/Secret.vue'
import Welcome from '../views/Welcome.vue'
import Logout from '../views/Logout.vue'
import IgFetchMedia from '../views/IgFetchMedia.vue'
import IgPreEdit from '../views/IgPreEdit.vue'
import FolderList from '../views/FolderList.vue'
import FolderDetail from '../views/FolderDetail.vue'
import TemplateList from '../views/TemplateList.vue'
import TemplateDetail from '../views/TemplateDetail.vue'
import CaptionDetail from '../views/CaptionDetail.vue'
import Parse from 'parse'

const requiredLogin = 'REQUIRED_LOGIN'
const requiredLogout = 'REQUIRED_LOGOUT'
const requiredPublic = 'REQUIRED_PUBLIC'

const layoutNoSlider = "no-sidebar"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {permission: requiredPublic, layout: layoutNoSlider},
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {permission: requiredLogout,  layout: layoutNoSlider},
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {permission: requiredLogin},
    component: Logout
  },
  {
    path: '/secret',
    name: 'secret',
    meta: {permission: requiredLogin},
    component: Secret
  },
  {
    path: '/welcome',
    name: 'welcome',
    meta: {permission: requiredLogin},
    component: Welcome
  },
  {
    path: '/igfetch',
    name: 'ig',
    meta: {permission: requiredLogin},
    component: IgFetchMedia
  },
  {
    path: '/folderList',
    name: 'folderList',
    meta: {permission: requiredLogin},
    component: FolderList
  },
  {
    path: '/folderList/:id',
    name: 'folderDetail',
    meta: {permission: requiredLogin},
    component: FolderDetail
  },
  {
    path: '/templateList',
    name: 'templateList',
    meta: {permission: requiredLogin},
    component: TemplateList
  },
  {
    path: '/templateList/:id',
    name: 'templateListDetail',
    meta: {permission: requiredLogin},
    component: TemplateDetail
  },
  {
    path: '/caption/:id',
    name: 'captionDetail',
    meta: {permission: requiredLogin},
    component: CaptionDetail
  },
  {
    path: '/igPreEdit',
    name: 'igPreEdit',
    meta: {permission: requiredLogin},
    component: IgPreEdit
  },
  {
    path: '/error',
    name: 'error',
    meta: {permission: requiredPublic, layout: layoutNoSlider},
    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const permission = to.meta.permission

  if(!permission) return alert(`[ERROR] router permission is incorrent, ${permission}`)

  const user = Parse.User.current()
  
  // 1- required Login
  if (permission === requiredLogin && !user) {
    return next({
      path: '/error',
      query: { msg: 'Required login'}
    })
  }
  // 2- required logout
  if (permission === requiredLogout && user) {
    return next({
      path: '/welcome',
      query: { msg: 'Required logout, but user: '+user.toJSON().username }
    })
  }

  next()
})

export default router
