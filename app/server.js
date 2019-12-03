const path = require('path')
const LRU = require('lru-cache')
const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer')

const template = require('fs').readFileSync(
  path.join(__dirname, './templates/index.html'),
  'utf-8',
)

const serverBundle = require('../public/dist/vue-ssr-server-bundle.json')
const clientManifest = require('../public/dist/vue-ssr-client-manifest.json')

const app = new Koa()
const router = new Router()

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
  inject: false,
  cache: new LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15,
  }),
})

app.use(serve(path.resolve(__dirname, '../public')))

router.get('*', async(ctx, next) => {
  const context = { url: ctx.url }
  const html = await renderer.renderToString(context)
  ctx.body = html
})
app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT || 3000)
