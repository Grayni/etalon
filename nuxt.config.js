module.exports = {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@/theme/index.styl',
    '@/theme/index.css'
  ],
  
  plugins: [
    '@/plugins/globals'
  ],
  
  buildModules: [
  ],
  
  modules: [
    '@nuxtjs/axios',
    ['vue-yandex-maps/nuxt', {
      apiKey: 'b226479b-b218-4f68-954f-8b4c1cce1446',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1'
    }],
    'nuxt-user-agent'
  ],
  
  axios: {
  },

  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
    }
  }
}
