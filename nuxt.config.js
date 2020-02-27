const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
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
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/axios.js',
    `~plugins/click-outside.js`,
  ],
  styleResources: {
    sass: [
     '~/assets/smart-grid.sass', // путь к вашему файлу
    ],
   },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/recaptcha',
    'nuxt-vuex-localstorage',
    ['nuxt-seo-module', {
      robots: {
        // ROBOTS.TXT options
        UserAgent: '*',
        CrawlDelay: '',
        Disallow: ['/admin', '/login'],
        Allow: ''
      },
      sitemap: [{
        generate: true
      }]
    }],
    [
      "nuxt-compress",
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }
    ],
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '',
        webvisor: true,
        // clickmap:true,
        // useCDN:false,
        // trackLinks:true,
        // accurateTrackBounce:true,
      }
    ]
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  recaptcha: {
    // hideBadge: false, 
    language: 'ru',
    // siteKey: process.env.SITE_KEY, 
    siteKey: '6LdjR9cUAAAAAHKeibDYlciyXLwHG1XG9yeU-LVB', 
    version: 2,
    size: 'normal'
  },
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
