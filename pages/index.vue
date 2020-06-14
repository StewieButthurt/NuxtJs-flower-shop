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
    if(!store.getters['modules/main-page/categories/categories']) {
       store.registerModule('categories', getCategoriesStore)
    }

    if(!store.getters['modules/main-page/menu/menuMainPage']) {
      store.registerModule('menu', getMenuStore)
    }

    if(store.getters['modules/main-page/menu/menuMainPage']) {
      let menu = await $axios.$get('/api/menu')
      await store.commit('modules/main-page/menu/setMenuMainPage', menu)
    }

    if(store.getters['modules/main-page/categories/categories']) {
      let categories = await $axios.$get('/api/categories')
      await store.commit('modules/main-page/categories/setCategories', categories)
    }
  }
}
</script>

<style lang="sass">
  .main-page
    width: 100%
  
</style>
