<template>
    <div class="main-slider" id="main-slider">
        <v-carousel
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
            cycle
            >
            <v-carousel-item
                v-for="(item, index) in slides"
                :key="index"
            >
                <app-image 
                    :image="item.src"
                />
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>

    const AppImage = () => import('~/components/main-page/slider/image.vue')

    export default {
        computed: {
           slides()  {
               return this.$store.getters['main-page/slider/slides']
           }
        },
        components: {
            AppImage
        }
    }
</script>

<style lang="sass">
    .main-slider
        +size(10)
        margin: 0 auto
        padding-top: 30px
        +size-md(11)
        +size-xs(12)
    
    #main-slider .v-carousel__controls__item .v-icon
        opacity: 1
    
    #main-slider .v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active:before
        opacity: 1
        color: #FFA800
        z-index: 10

    #main-slider .v-btn:before
        top: 2.8px
        left: 4px
        width: 21px
        height: 21px
</style>