<template>
  <div class="defautl__container" v-resize="onResize">
    <v-app id="defalut-layouts" class="light default__fonts-rubik">

      <app-navigation-drawer 
        :drawer="drawer"
        :mainLinks="mainLinks"
        @changeDrawer="changeDrawer"
      />

      <app-call-bar />

      <app-logo-bar 
        :mainLinks="mainLinks"
        :windowSize="windowSize"
      /> 

      <app-search-bar />

      <app-links-categories-bar 
        :drawer="drawer"
        @changeDrawer="changeDrawer"
      />


      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
      <v-footer
        color="#8B9620"
      >
        <span>&copy; 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>

const AppNavigationDrawer = () => import('~/components/layouts/default/navigation-drawer/index.vue')
const AppCallBar = () => import('~/components/layouts/default/call-app-bar/index.vue')
const AppLogoBar = () => import('~/components/layouts/default/logo-app-bar/index.vue')
const AppSearchBar = () => import('~/components/layouts/default/search-app-bar/index.vue')
const AppLinksCategoriesBar = () => import('~/components/layouts/default/links-categories-bar/index.vue')

export default {
  data () {
    return {
      drawer: false,
      windowSize: {
          x: 0,
          y: 0
      }
    }
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    async changeDrawer(drawer) {
      this.drawer = drawer
    }
  },
  async mounted() {
    this.onResize()
  },
  components: {
    AppNavigationDrawer,
    AppCallBar,
    AppLogoBar,
    AppSearchBar,
    AppLinksCategoriesBar
  },
  computed: {
    mainLinks() {
      return this.$store.getters['layouts-links/mainLinks']
    }
  }
}
</script>

<style lang="sass">

  .defautl__container
    margin: 0 auto
    width: 100%
    max-width: 1920px
  
  #defalut-layouts .v-list
    background: white
  
  #layout-default__id-v-chip .v-chip
    cursor: pointer
    color: black
    font-weight: 500
  
  .default__fonts-rubik
    font-family: 'Rubik-Regular', sans-serif
    font-weight: 400

</style>
