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
                @resetNotifications="resetNotifications"
                @overlayChange="overlayChange"
                @changeProgressValue="changeProgressValue"
                @changeMessageStatus="changeMessageStatus"
                @changeCheckErrorForm="changeCheckErrorForm"
                @changeCheckErrorImage="changeCheckErrorImage"
                @overlayOffError="overlayOffError"
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


    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Предпросмотр'
        },
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
        components: {
            AppSwiper,
            AppDescription,
            AppSpecifications,
            AppButtons,
            AppSnackbars
        },
        middleware: 'checkProductAdd',
        async mounted() {
            this.img = this.images[0].previewImg
        },
        data() {
            return {
                img: null,
                x: '',
                y: '',
                text: '',
                colorBtn: '',
                colorBckg: '',
                snackbar: false,
                message: false,
                overlay: false,
                messageStatus: 'Начало загрузки...',
                progressValue: 0,
                checkErrorForm: false,
                checkErrorImage: false,

            }
        },
        computed: {
            images() {
                return this.$store.getters['modules/product/images/images']
            },
            categories() {
                return this.$store.getters['modules/product/categories/categories']
            }
        },
        methods: {
            async mouseEnterImage(img) {
                this.img = img
            },
            async changeImg(image) {
                this.img = image
            },
            async resetNotifications(data) {
                this.message = data.message
                this.snackbar = data.snackbar,
                this.progressValue = data.progressValue,
                this.checkErrorForm = data.checkErrorForm,
                this.checkErrorImage = data.checkErrorImage
            },
            async changeProgressValue(value) {
                this.progressValue = value
            },
            async changeMessageStatus(value) {
                this.messageStatus = value
            },
            async changeCheckErrorForm(value) {
                this.checkErrorForm = value
            },
            async changeCheckErrorImage(value) {
                this.checkErrorImage = value
            },
            async overlayOffError() {
                this.overlay = false
            },
            async overlayOff() {
                this.overlay = false
                this.message = 'success'
                setTimeout(this.redirectAddProduct, 2000)
            },
            async overlayChange(value) {
                this.overlay = value
            },
            async redirectAddProduct() {
                window.location.reload(true)
            },
            async changeSnackbar(value) {
                this.snackbar = value
            },
        },
        watch: {
            message(val) {
                if(val === 'success') {
                    this.text = 'Товар добавлен! Переадресация...'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                } else if(val === 'error'){
                    this.text = 'Упс! Что то пошло не так!'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
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