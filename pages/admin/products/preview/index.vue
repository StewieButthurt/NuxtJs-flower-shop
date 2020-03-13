<template>
    <div class="preview-container" id="preview-container">
        <div class="preview-wrapper">
            <div class="preview__swiper-descr">
                <div class="preview__swiper">
                    <client-only>
                        <div class="preview__swiper-image-container"
                            @mousemove="zoomImg($event)"
                            @mouseleave="zoomImgLeave()"
                            id="preview__swiper-image"
                        >
                            <div class="preview__swiper-image"
                                :style="{ backgroundImage: `url(${mainImg})`, backgroundPosition: 'center center', backgroundSize: resultSize, right: `${right}px`, bottom: `${bottom}px` }"
                                :class="{'preview__swiper-image-mouseenter' : zoomStatus}"
                                >
                            </div>
                        </div>
                        <div class="preview__swiper-images-wrapper">
                            <app-product-preview-images 
                                v-for="(item, index) in images"
                                :key="index"
                                :image="item.previewImg"
                                :index="index"
                                :mainIndex="mainIndex"
                                @changeImg="changeImg"

                            />
                            <!-- <div class="preview__swiper-image-item"
                                v-for="(item, index) in images"
                                :key="index"
                                @click="mainImg = item.previewImg"
                                @mouseenter="mouseEnterImage()"
                            >
                                <div 
                                    class="preview__swiper-image " 
                                    :style="{ backgroundImage: `url(${item.previewImg})`, backgroundPosition: 'center center', backgroundSize: 'cover' }">
                                </div>
                            </div> -->
                        </div>
                    </client-only>
                </div>
                <div class="preview__descr">
                    <div class="preview__descr-title">
                        Спатифиллум Штраусс в керамике 13/50 черный/белый керамический горшок
                    </div>
                    <div class="preview__descr__descr-rating">
                        <v-rating 
                            v-model="rating"
                            background-color="orange lighten-3"
                            color="orange"
                            hover
                            half-increments
                        ></v-rating>
                        <span style="margin-left: 20px">(Отзывов еще нет)</span>
                    </div>
                    <div class="preview__descr-line">
                    </div>
                    <div class="preview__descr-price">
                        <app-product-price 
                            :price="price"
                        />
                    </div>
                    <div class="preview__descr-text">
                        Очищает воздух от вредных примесей формальдегида, бензола, трихлорэтилена, химикатов очистителей и растворителей. 
                        Одно из самых известных растений, применяемых для очистки воздуха от паров спирта, ацетона. 
                        По некоторым данным уничтожает споры плесени.
                    </div>
                    <div class="preview__descr-article">
                        артикул <span>{{article}}</span>
                    </div>
                    <div class="preview__descr-other-field preview__descr-price">
                        <app-product-other-field 
                            v-for="item in newFields"
                            :key="item.title"
                            :title="item.title"
                            :descr="item.descr"
                        />
                    </div>
                    <div class="preview__descr-big-line">
                    </div>
                    <div class="preview__descr__buttons">
                        <div class="preview__descr__buttons-minus" @click="counterMinus()">
                            <span class="preview__descr__buttons-plus-hor"></span>
                        </div>
                        <div class="preview__descr__buttons-result">
                            <span>{{counterProducts}}</span>
                        </div>
                        <div class="preview__descr__buttons-minus" @click="counterPlus()">
                            <span class="preview__descr__buttons-plus-hor"></span> 
                            <span class="preview__descr__buttons-plus-vert"></span>   
                        </div>
                        <v-btn
                            :disabled="counterProducts === 0"
                            color="#7CAA1A"
                            class="ml-5 white--text preview__descr__buttons-card"
                        >
                            <v-icon class="mr-3" size="24px" right dark>mdi-cart-outline</v-icon>
                            В корзину
                        </v-btn>
                    </div>
                    <div class="preview__descr-big-line">
                    </div>
                </div>
            </div>
        </div>
    </div>
                
</template>

<script>
    const AppProductPrice = () => import('~/components/admin/product-price/index.vue')
    const AppProductOtherField = () => import('~/components/admin/product-other-field/index.vue')
    const AppProductPreviewImages = () => import('~/components/admin/product-preview-images/index.vue')

    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Предпросмотр'
        },
        components: {
            AppProductPrice,
            AppProductOtherField,
            AppProductPreviewImages
        },
        middleware: 'checkData',
        async mounted() {
            this.mainImg = this.images[0].previewImg
        },
        data() {
            return {
                rating: 0,
                counterProducts: 0,
                mainImg: '',
                mainIndex: '',
                zoomStatus: false,
                x: '',
                y: '',
                bottom: 0,
                right: 0,
                resultSize: 'cover'
            }
        },
        computed: {
            images() {
                return this.$store.getters['add-product/images']
            },
            img() {
                return this.mainImg
            },
            title() {
                return this.$store.getters['add-product/title']
            },
            price() {
                return this.$store.getters['add-product/price']
            },
            descr() {
                return this.$store.getters['add-product/descr']
            },
            article() {
                return this.$store.getters['add-product/article']
            },
            newFields() {
                return this.$store.getters['add-product/newFields']
            }

        },
        methods: {
            async getImages() {
                await this.$store.dispatch('image-preview/getImage')
            },
            async counterPlus() {
                if(this.counterProducts < 10) {
                    this.counterProducts++
                }
            },
            async counterMinus() {
                if(this.counterProducts > 0) {
                    this.counterProducts--
                }
            },
            async changeImg({mainIndex, image}) {
                this.mainImg = image
                this.mainIndex = mainIndex
            },
            async zoomImg(event) {
                this.zoomStatus = true
                let img = document.getElementById('preview__swiper-image')
                let a = img.getBoundingClientRect()

                this.bottom = event.pageY - a.top
                this.bottom = this.bottom - window.pageYOffset
                this.bottom = this.bottom - (img.offsetHeight  / 2)

                this.right = event.pageX - a.left
                this.right = this.right - window.pageXOffset
                this.right = this.right - (img.offsetWidth / 2)
            },
            async zoomImgLeave() {
                this.zoomStatus = false,
                this.bottom = 0
                this.right = 0
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
    
    .preview__swiper-descr
        width: 100%
        display: flex
        flex-wrap: wrap
        +md-block
            justify-content: center
    
    .preview__swiper
        display: flex
        flex-direction: column
        align-items: center
        max-width: 673px
        +size(5)
        +size-md(6)
        +size-xs(11)
    
    .preview__descr
        +size(7)
        display: flex
        flex-direction: column
        margin-left: 20px
        +md-block
            margin-top: 50px
            margin-left: 0px
        +size-md(11)
        +size-xs(12)

    .preview__descr-title
        font-family: 'Montserrat-SemiBold'
        font-weight: 600
        font-size: 28px
        margin: 0.5rem
    
    .preview__descr__descr-rating
        display: flex
        align-items: center
        margin-top: 20px
        flex-wrap: wrap

    .preview__descr-line
        width: 50px
        height: 2px
        background-color: black
        margin: 0.8rem
        margin-top: 20px
    
    .preview__descr-price
        margin: 0.8rem
    
    .preview__descr-text
        margin: 0.8rem
        font-size: 16px
    
    .preview__descr-article
        margin: 0.8rem
        text-transform: uppercase
        margin-top: 40px
        font-size: 14px
    
    .preview__descr-article span
        margin-left: 10px
    
    .preview__descr-other-field
        display: flex
        flex-direction: column
    
    .preview__descr-big-line
        height: 1px
        background-color: #C8C8C8
        margin-top: 20px
        margin: 0.8rem
    
    .preview__descr__buttons
        display: flex
        align-items: center
        margin: 0.8rem
        margin-top: 15px
    
    .preview__descr__buttons-minus
        display: flex
        justify-content: center
        align-items: center
        width: 32px
        height: 52px
        border: 1px solid #BDBDBD
        cursor: pointer
        position: relative
    
    .preview__descr__buttons-result
        width: 47px
        height: 52px
        font-size: 18px
        border: 1px solid #BDBDBD
        display: flex
        justify-content: center
        align-items: center
        font-family: 'Montserrat-SemiBold'
        font-weight: 600
    
    .preview__descr__buttons-plus-hor
        width: 10px
        height: 1px
        background-color: black
    
    .preview__descr__buttons-plus-vert
        width: 1px
        height: 10px
        background-color: black
        position: absolute
        top: 20px
    
    #preview-container .preview__descr__buttons-card
        width: 161px
        height: 52px
    
    .preview__swiper-image
        position: relative
        width: 100%
        padding-top: 100%
        transition: transform 0.2s
        cursor: pointer
    
    
    .preview__swiper-images-wrapper
        display: flex
        align-items: center
        width: 100%
        justify-content: center
        margin-top: 5%
    
    .preview__swiper-image-item
        +size(2)
        margin-left: 1%
        margin-right: 1%
        cursor: pointer
    
    .preview__swiper-image-container
        overflow: hidden
        width: 100%
    
    .preview__swiper-image-mouseenter
        transform: scale(2)
</style>