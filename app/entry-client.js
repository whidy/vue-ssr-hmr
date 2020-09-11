/* eslint-disable no-underscore-dangle */
import Vue from 'vue'
import { createApp } from './app'

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      }).then(next).catch(next)
    } else {
      next()
    }
  },
})

const { app, router, store } = createApp()

router.onReady(() => {
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      if (!diffed) {
        diffed = (prevMatched[i] !== c)
      }
      return diffed
    })
    console.log(diffed)
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  app.$mount('#app')
})

/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
if (module.hot) {
  const api = require('vue-hot-reload-api')
  // const Vue = require('vue')

  api.install(Vue)
  if (!api.compatible) {
    throw new Error(
      'vue-hot-reload-api is not compatible with the version of Vue you are using.',
    )
  }

  module.hot.accept()
}
