import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4c20deb0 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _c5856b86 = () => interopDefault(import('..\\pages\\cards\\index.js' /* webpackChunkName: "pages/cards/index" */))
const _69977784 = () => interopDefault(import('..\\pages\\help\\index.vue' /* webpackChunkName: "pages/help/index" */))
const _37bf0fe0 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _63e49b82 = () => interopDefault(import('..\\pages\\movieRegister\\index.vue' /* webpackChunkName: "pages/movieRegister/index" */))
const _0cb79dc8 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _1b0b7e37 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages/search/index" */))
const _5b395d5f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _4c20deb0,
    name: "about"
  }, {
    path: "/cards",
    component: _c5856b86,
    name: "cards"
  }, {
    path: "/help",
    component: _69977784,
    name: "help"
  }, {
    path: "/home",
    component: _37bf0fe0,
    name: "home"
  }, {
    path: "/movieRegister",
    component: _63e49b82,
    name: "movieRegister"
  }, {
    path: "/register",
    component: _0cb79dc8,
    name: "register"
  }, {
    path: "/search",
    component: _1b0b7e37,
    name: "search"
  }, {
    path: "/",
    component: _5b395d5f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
