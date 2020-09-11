import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => new Promise((resolve, reject) => {
  const s = isDev && Date.now()
  const { app, router, store } = createApp()

  const { url } = context
  const { fullPath } = router.resolve(url).route

  // if (fullPath !== url) {
  //   return reject({ url: fullPath })
  // }
  const meta = app.$meta()

  // set server-side router's location
  router.push(url)
  context.meta = meta

  // wait until router has resolved possible async components and hooks
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents()
    if (!matchedComponents.length) {
      return reject(new Error(404))
    }

    // Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
    //   store,
    //   route: router.currentRoute
    // }))).then(() => {
    //   isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
    //   // After all preFetch hooks are resolved, our store is now
    //   // filled with the state needed to render the app.
    //   // Expose the state on the render context, and let the request handler
    //   // inline the state in the HTML response. This allows the client-side
    //   // store to pick-up the server-side state without having to duplicate
    //   // the initial data fetching on the client.
    //   context.state = store.state
    //   resolve(app)
    // }).catch(reject)
    context.rendered = () => {
      context.state = store.state
    }

    // no matched routes, reject with 404


    // the Promise should resolve to the app instance so it can be rendered
    return resolve(app)
  }, reject)
})
