<template>
    <div class="preview-container" id="preview-container">
        <div class="preview-wrapper">
            <div class="preview__swiper-descr">

                <app-swiper 
                    :img="img"
                    @changeImg="changeImg"
                />

                <app-description 
                    @mouseEnterImage="mouseEnterImage"
                />

            </div>


            <app-specifications />

            <app-buttons 
                @overlayOff="overlayOff"
            />

            <app-snackbars 
                :snackbar="snackbar"
                :text="text"
                :colorBckg="colorBckg"
                :colorBtn="colorBtn"
                @changeSnackbar="changeSnackbar"
            />

            <v-overlay :value="overlay" opacity="0.9" z-index="10">
                <div class="preview-image-overlay">
                    <v-progress-linear  
                        :value="progressValue"
                        height="7"
                        light
                    ></v-progress-linear>
                    <div class="preview-image-overlay__text mt-5">
                        {{messageStatus}}
                    </div>
                </div>
            </v-overlay>

        </div>
    </div>
                
</template>

<script>
    const AppSwiper = () => import('~/components/admin/product/preview/swiper/index.vue')
    const AppDescription = () => import('~/components/admin/product/preview/description/index.vue')
    const AppSpecifications = () => import('~/components/admin/product/preview/specifications/index.vue')
    const AppButtons  = () => import('~/components/admin/product/preview/buttons/index.vue')
    const AppSnackbars = () => import('~/components/alerts/snackbar-http/index.vue')
    const getSnackbarStore = () => import('~/store/modules/alert/snackbar.js')
    const getPreviewStore = () => import('~/store/modules/product/preview/main.js')


    export default {
        layout: 'admin',
        async validate({ store, redirect, $axios }) {
            try {
                
                if(!store.getters['modules/auth/token']) {
                    await store.dispatch('modules/auth/autoLogin')
                }

                await $axios.$get('/api/auth/admin/token')
                return true
            } catch(e) {
                redirect('/login?message=login')
            }
        },
        head: {
            title: 'Панель администратора | Предпросмотр'
        },
        components: {
            AppSwiper,
            AppDescription,
            AppSpecifications,
            AppButtons,
            AppSnackbars
        },
        middleware: ['checkProductEdit'],
        async mounted() {

            if(!this.$store.getters['modules/alert/snackbar/snackbar']) {
                await this.$store.registerModule('snackbar', getSnackbarStore)
            }

            if(!this.$store.getters['modules/product/preview/main/progressValue']) {
                await this.$store.registerModule('product_preview', getPreviewStore)
            }

            this.img = this.images[0].previewImg
        },
        data() {
            return {
                img: null,
                x: '',
                y: ''
            }
        },
        computed: {
            images() {
                return this.$store.getters['modules/product/images/images']
            },
            categories() {
                return this.$store.getters['modules/product/categories/categories']
            },
            message() {
                return this.$store.getters['modules/alert/snackbar/message']
            },
            snackbar() {
                return this.$store.getters['modules/alert/snackbar/snackbar']
            },
            text() {
                return this.$store.getters['modules/alert/snackbar/text']
            },
            colorBckg() {
                return this.$store.getters['modules/alert/snackbar/colorBckg']
            },
            colorBtn() {
                return this.$store.getters['modules/alert/snackbar/colorBtn']
            },
            progressValue() {
                return this.$store.getters['modules/product/preview/main/progressValue']
            },
            messageStatus() {
                return this.$store.getters['modules/product/preview/main/messageStatus']
            },
            overlay() {
                return this.$store.getters['modules/product/preview/main/overlay']
            }
        },
        methods: {
            async mouseEnterImage(img) {
                this.img = img
            },
            async changeImg(image) {
                this.img = image
            },
            async overlayOff() {
                await this.$store.dispatch('modules/product/preview/main/setOverlayChange',
                    false)
                
                await this.$store.dispatch('modules/alert/snackbar/setMessage', 'success')
                setTimeout(this.redirectAddProduct, 2000)
            },
            async redirectAddProduct() {
                window.location.reload(true)
            },
            async changeSnackbar(value) {
                this.$store.dispatch('modules/alert/snackbar/setSnackbar', value)
            },
        },
        watch: {
            message(val) {
                if(val === 'success') {
                    this.$store.dispatch('modules/alert/snackbar/setText',
                     'Товар добавлен! Переадресация...')
                    this.$store.dispatch('modules/alert/snackbar/setColorBtn',
                     'white')
                    this.$store.dispatch('modules/alert/snackbar/setColorBckg',
                     'grey darken-4')
                    this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                     true)
                } else if(val === 'error'){
                    this.$store.dispatch('modules/alert/snackbar/setText',
                     'Упс! Что то пошло не так!')
                     this.$store.dispatch('modules/alert/snackbar/setColorBtn',
                     'white')
                    this.$store.dispatch('modules/alert/snackbar/setColorBckg',
                     'grey darken-4')
                    this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                     true)
                }
            }
        }
    }
</script>

<style lang="sass">
    
    .preview-container
        width: 100%
        display: flex
        justify-content: center
        font-family: 'Montserrat-Medium'

    .preview-wrapper
        max-width: 1920px
        width: 100%
        flex-direction: column
        align-items: center
        display: flex
        position: relative
    
    .preview__swiper-descr
        width: 100%
        display: flex
        flex-wrap: wrap
        +size(11)
        +md-block
            justify-content: center
    
    
    .preview__swiper-image-item
        +size(2)
        margin-left: 1%
        margin-right: 1%
        cursor: pointer
    
    .itemIn-enter-active, .itemIn-leave-active 
        transition: opacity .3s
    
    .itemIn-enter, .itemIn-leave-to
        opacity: 0
    
    .preview-image-overlay
        display: flex
        width: 300px
        justify-content: center
        align-items: center
        flex-direction: column
        text-align: center
</style>