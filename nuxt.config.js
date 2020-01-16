import appconst from './utiltools/appconst'
let ajaxConfig = {
  // baseURL: appconst.remoteServiceBaseUrl,
  proxy: true,
  credentials: true
}
if (process.env.NODE_ENV === 'production')
  ajaxConfig = {
    baseURL: appconst.remoteServiceBaseUrl,
    // proxy: true,
    credentials: true
  }
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ]
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    middleware: ['user-agent'],
    // 配置路由的模式，鉴于服务端渲染的特性，不建议修改该配置
    mode: 'history'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'swiper/dist/css/swiper.css',
    'assets/css/main.less',
    '~/static/css/all.min.css'
    // '~/node_modules/material-design-icons/iconfont/material-icons.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/main.js' },
    { src: '~/plugins/combined-inject.js' },
    { src: '~/plugins/client.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     baseURL and proxy cannot be used at the same time, so when the proxy option is in use, you need to define prefix instead of baseURL.
     */
  axios: ajaxConfig,
  proxy: {
    '/api/': { target: 'https://cms.ednet.cn' },
    '/AbpUserConfiguration/': { target: 'https://cms.ednet.cn' }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'cheap-module-source-map'
      }
    }
  }
}
