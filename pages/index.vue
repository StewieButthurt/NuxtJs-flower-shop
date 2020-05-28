<template>
  <div class="main-page" id="main-page">

    <app-main-slider />

    <app-services />

    <app-links-with-images />


  </div>
</template>

<script>

const AppMainSlider = () => import('~/components/main-page/slider/index.vue')
const AppServices = () => import('~/components/main-page/services/index.vue')
const AppLinksWithImages = () => import('~/components/main-page/links-with-images/index.vue')
const getCategoriesStore = () => import('~/store/modules/main-page/categories.js')
const getMenuStore = () => import('~/store/modules/main-page/menu.js')


export default {
  components: {
    AppMainSlider,
    AppServices,
    AppLinksWithImages
  },
  head: {
    title: 'Цветочный магазин | Главная',
    meta: [
      {hid: 'homepage-description', name: 'description', content: 'Лучший интернет-магазин в котором вы найдете нужные товары по низким ценам. Купите цветы и инструменты для дачи и дома.'},
      {hid: 'homepage-keywords', name: 'keywords', content: 'цветы, цветочный магазин, интернет магазин, аксессуары, саженцы'}
    ]
  },
  async fetch ({ store, $axios}) {
    store.registerModule('categories', getCategoriesStore)
    store.registerModule('menu', getMenuStore)

    if(store.getters['modules/main-page/menu/menu'].length === 0) {
      let menu = await $axios.$get('/api/menu')
      store.commit('modules/main-page/menu/set', menu)
    }

    if(store.getters['modules/main-page/categories/categories'].length === 0) {
      let categories = await $axios.$get('/api/categories')
      store.commit('modules/main-page/categories/set', categories)
    }
  }
}
</script>

<style lang="sass">
  .main-page
    width: 100%
  
</style>
