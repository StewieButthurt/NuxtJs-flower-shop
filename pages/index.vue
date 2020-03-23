<template>
  <div class="main-page" id="main-page">

    <app-main-slider />

    <app-services />

  </div>
</template>

<script>

const AppMainSlider = () => import('~/components/main-page/slider/index.vue')
const AppServices = () => import('~/components/main-page/services/index.vue')


export default {
  components: {
    AppMainSlider,
    AppServices
  },
  head: {
    title: 'Цветочный магазин | Главная',
    meta: [
      {hid: 'homepage-description', name: 'description', content: 'Лучший интернет-магазин в котором вы найдете нужные товары по низким ценам. Купите цветы и инструменты для дачи и дома.'},
      {hid: 'homepage-keywords', name: 'keywords', content: 'цветы, цветочный магазин, интернет магазин, аксессуары, саженцы'}
    ]
  }
}
</script>

<style lang="sass">
  .main-page
    width: 100%
  
</style>
