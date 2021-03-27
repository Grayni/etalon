module.exports = {
  mode: 'universal',
  cache: true,
  head: {
    titleTemplate: '%s - ЦБО "Эталон"',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  loading: { color: '#429ce3' },

  router: {
    trailingSlash: false
  },

  css: [
    '@/theme/index.styl',
    '@/theme/index.css'
  ],

  plugins: [
    '@/plugins/globals',
    '@/plugins/axios',
    //{ src: '@/plugins/socket', ssr: false },
    { src: '@/plugins/ksvuescrollmagic.js', ssr: false }
  ],

  modules: [
    '@nuxtjs/redirect-module',
    '@nuxtjs/device',
    '@nuxtjs/axios',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    ['vue-yandex-maps/nuxt', { apiKey: 'b226479b-b218-4f68-954f-8b4c1cce1446', lang: 'ru_RU', coordorder: 'latlong', version: '2.1' }]
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3001',
    https: true
  },

  env: {
    appName: 'ЦБО "Эталон"',
    baseUrl: process.env.BASE_URL || 'https://cbo-etalon.ru',
    prodEnv: process.env.BASE_URL || 'http://localhost:3001'
  },
  
  robots: {
    UserAgent: '*',
    Disallow: ['/api', '/api/*', '/admin/*', '/chart/*'],
    Host: process.env.BASE_URL,
    Sitemap: process.env.BASE_URL+'/sitemap.xml'
  },

  sitemap: {
    hostname: 'https://cbo-etalon.ru',
    path: '/sitemap.xml',
    exclude: [
      '/api/**',
      '/admin/**',
      '/admin',
      '/chart'
    ],
    gzip: true,
    defaults: {
      changefreq: 'weekly',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true
    },
    routes: [
      '/',
      '/services',
      '/questions',
      '/stocks',
      '/artic',
      '/contacts',
      '/article/obshchaya_sistema_nalogooblojeniya',
      '/article/vybor_sistemy_nalogooblojeniya',
      '/article/edinyi_nalog_na_vmenennyi_dohod',
      '/article/uproshchennaya_sistema_nalogooblojeniya',
      '/article/edinyi_selskohozyaistvennyi_nalog',
      '/article/patentnaya_sistema_nalogooblojeniya',
      '/politic.pdf',
      '/sitemap.xml',
      '/questions/kakie_vidy_deyatelnosti_osushchestvlyaet_centr_buhgalterskogo_obslujivaniya_etalon'
    ]
  },
  
  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24
    }
  },

  redirect: [
    { from: '^/index', to: '/', statusCode: 301},
    { from: '^/document/psn/prekracheniepsn.xls', to: '/', statusCode: 301},
    { from: '^/kolichestvo-operaciy', to: '/services', statusCode: 301},
    { from: '^/buhgalterskie-uslugi-ceny', to: '/services', statusCode: 301},
    { from: '^/article$', to: '/artic', statusCode: 301},
    { from: '^/optimization', to: '/article/vybor_sistemy_nalogooblojeniya', statusCode: 301},
    { from: '^/obshchaya_sistema_nalogooblojeniya', to: '/article/obshchaya_sistema_nalogooblojeniya', statusCode: 301},
    { from: '^/obshajy-sistema-nalogooblogenijy', to: '/article/obshchaya_sistema_nalogooblojeniya', statusCode: 301},
    { from: '^/usn', to: '/article/uproshchennaya_sistema_nalogooblojeniya', statusCode: 301},
    { from: '^/uproshchennaya_sistema_nalogooblojeniya', to: '/article/uproshchennaya_sistema_nalogooblojeniya', statusCode: 301},
    { from: '^/envd', to: '/article/edinyi_nalog_na_vmenennyi_dohod', statusCode: 301},
    { from: '^/edinyi_nalog_na_vmenennyi_dohod', to: '/article/edinyi_nalog_na_vmenennyi_dohod', statusCode: 301},
    { from: '^/vybor_sistemy_nalogooblojeniya', to: '/article/vybor_sistemy_nalogooblojeniya', statusCode: 301},
    { from: '^/statiy', to: '/artic', statusCode: 301},
    { from: '^/eshn', to: '/article/edinyi_selskohozyaistvennyi_nalog', statusCode: 301},
    { from: '^/edinyi_selskohozyaistvennyi_nalog', to: '/article/edinyi_selskohozyaistvennyi_nalog', statusCode: 301},
    { from: '^/psn', to: '/article/patentnaya_sistema_nalogooblojeniya', statusCode: 301},
    { from: '^/patentnaya_sistema_nalogooblojeniya', to: '/article/patentnaya_sistema_nalogooblojeniya', statusCode: 301}
  ],

  build: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  telemetry: {
    enabled: false
 }
}
