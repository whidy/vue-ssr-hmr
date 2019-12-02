const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')

const { createBundleRenderer } = require('vue-server-renderer')

const template = require('fs').readFileSync(
  path.join(__dirname, './templates/index.html'),
  'utf-8',
)

const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const app = new Koa()
const router = new Router()
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
  inject: false,
})

app.use(require('koa-static')(path.join(__dirname, '../dist')))

router.get('*', async(ctx, next) => {
  const context = { url: ctx.url }
  const html = await renderer.renderToString(context)
  ctx.body = html
})
app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT || 3000)
