const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '',
    title: 'Цветочный магазин',
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
    { src: '~assets/fonts/montserrat.css' },
    { src: '~assets/fonts/rubik.css' },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/axios.js',
    `~plugins/click-outside.js`,
    `~plugins/materialDesign.js`,
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
    ['@nuxtjs/vuetify', {
      defaultAssets: false
    }],
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
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
      light: true,
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
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
