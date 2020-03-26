module.exports = {
  mode: 'universal',

  head: {
    title: process.env.appName || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Предоставление бухгалтерских услуг по Санкт-Петербургу' || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#429ce3' },

  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@/theme/index.styl',
    '@/theme/index.css'
  ],

  plugins: [
    '@/plugins/globals',
    '@/plugins/axios',
    { src: '@/plugins/ksvuescrollmagic.js', ssr: false },
    { src: '@plugins/ga.js', mode: 'client' }
  ],

  buildModules: [
  ],

  modules: [
    '@nuxtjs/redirect-module',
    '@nuxtjs/axios',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    ['vue-yandex-maps/nuxt', {
      apiKey: 'b226479b-b218-4f68-954f-8b4c1cce1446',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1'
    }],
    'nuxt-user-agent',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '29051230',
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }
    ],
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3001',
    https: true
  },

  env: {
    appName: 'ЦБО "Эталон"',
  },

  pwa: {
    icon: {
      iconFileName: 'favicon.png',
      iconSrc: '/static/favicon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      targetDir: 'icons',
      accessibleIcons: true
    }
  },

  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
    }
  },

  robots: {
    UserAgent: '*',
    Disallow: ['/api', '/api/*', '/admin', '/admin/*'],
    Host: process.env.BASE_URL
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    exclude: [
      '/api/**',
      '/admin/**'
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true
    },
    routes: [
      '/services',
      '/questions',
      '/stocks',
      '/artic',
      '/contacts',
      '/obshchaya_sistema_nalogooblojeniya',
      '/vybor_sistemy_nalogooblojeniya',
      '/edinyi_nalog_na_vmenennyi_dohod',
      '/uproshchennaya_sistema_nalogooblojeniya',
      '/edinyi_selskohozyaistvennyi_nalog',
      '/patentnaya_sistema_nalogooblojeniya',
      '/politic.pdf'
    ]
  },

  redirect: [
    { from: '^/index.html', to: '/' },
    { from: '^/buhgalterskie-uslugi-ceny.html', to: '/services' },
    { from: '^/documents.html', to: '/' },
    { from: '^/articles', to: '/artic' },
    { from: '^/optimization.html', to: '/article/vybor_sistemy_nalogooblojeniya' },
    { from: '^/obshajy-sistema-nalogooblogenijy.html', to: '/article/obshchaya_sistema_nalogooblojeniya' },
    { from: '^/usn.html', to: '/article/uproshchennaya_sistema_nalogooblojeniya' },
    { from: '^/envd.html', to: '/article/edinyi_nalog_na_vmenennyi_dohod' },
    { from: '^/statiy.html', to: '/artic' },
    { from: '^/eshn.html', to: '/article/edinyi_selskohozyaistvennyi_nalog' },
    { from: '^/psn.html', to: '/article/patentnaya_sistema_nalogooblojeniya' }
  ]
}
