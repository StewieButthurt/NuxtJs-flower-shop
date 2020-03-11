<template>
    <div class="preview-container" id="preview-container">
        <div class="preview-wrapper">
            <div class="preview__swiper-descr">
                <div class="preview__swiper">
                    <client-only>
                        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                            <swiper-slide 
                                v-for="(item, index) in images"
                                :key="index"
                                :style="`background-image: url('${item.previewImg}'); padding-top: 100%`"
                            ></swiper-slide>
                            <div class="swiper-button-next" slot="button-next"></div>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                        </swiper>
                        <!-- swiper2 Thumbs -->
                        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                            <swiper-slide 
                                v-for="(item, index) in images"
                                :key="index"
                                :style="`background-image: url('${item.previewImg}'); padding-top: 40%`"
                            ></swiper-slide>
                        </swiper>
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

                </div>
            </div>
        </div>
    </div>
                
</template>

<script>
    const AppProductPrice = () => import('~/components/admin/product-price/index.vue')

    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Предпросмотр'
        },
        components: {
            AppProductPrice
        },
        async mounted() {

            this.arr = this.$store.getters['add-product/images']

            this.$nextTick(() => {
                const swiperTop = this.$refs.swiperTop.swiper
                const swiperThumbs = this.$refs.swiperThumbs.swiper
                swiperTop.controller.control = swiperThumbs
                swiperThumbs.controller.control = swiperTop
            })

            // if(this.images[0].previewImg &&
            //     this.title.length !== 0 &&
            //     this.descr.length !== 0 &&
            //     this.price.length !== 0 &&
            //     this.article.length !== 0
            // ) {
            // } else {
            //     this.$router.push('/admin/products/')
            // }

            
        },
        data() {
            return {
                mainImg: '',
                rating: 0,
                resultImages: [],
                arr: [],
                swiperOptionTop: {
                    initialSlide: 1,
                    speed: 300,
                    effect: 'slide',
                    observer: true,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                swiperOptionThumbs: {
                    initialSlide: 1,
                    spaceBetween: 20,
                    observer: true,
                    autoplay: true,
                    effect: 'slide',
                    centeredSlides: true,
                    slidesPerView: "auto",
                    touchRatio: 0.2,
                    slideToClickedSlide: true,
                }
            }
        },
        computed: {
            images() {
                return this.$store.getters['add-product/images']
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
            img1() {
                if(this.images.length > 0) {
                    if(this.images[0].previewImg) {
                        return this.images[0].previewImg
                    } else {
                        return ''
                    }
                }
                
            },
            countSlides() {
                if(this.arr.length > 0) {
                    
                    let k = this.arr.length / 4

                    if(k % 2 !== 0) {

                    } else {
                        k = k++
                    }

                    for(let i = 0; i < k; i++) {

                        if(this.arr.length >= 4) {
                            let newC = []
                            for(let c = 0; c < 4; c++) {
                                let g = this.arr[c].previewImg
                                newC.push(g)
                            }

                            this.resultImages.push(newC)

                            let newArr = []

                            for(let f = 4; f < this.arr.length; f++) {
                                newArr.push(this.arr[f])
                            }
                            
                            this.arr = newArr

                        } else {
                            let newD = []
                            for(let d = 0; d < this.arr.length; d++) {
                                newD.push(this.arr[d].previewImg)
                            }
                            this.resultImages.push(newD)

                        }
                    }

                    console.log(this.resultImages)

                    return this.resultImages
                }
                
            }

        },
        methods: {
            async getImages() {
                await this.$store.dispatch('image-preview/getImage')
            }
        }
    }
</script>

<style lang="sass">
    
    .swiper-container
        background-color: white

    .swiper-slide
        background-size: cover
        background-position: center
        cursor: pointer
    
    .gallery-top
        width: 100%
        max-width: 350px
    
    .gallery-thumbs
        width: 100%
        max-width: 350px
        margin-top: 10px
    
    .gallery-thumbs .swiper-slide
        +size(5)
        opacity: 0.4
    
    .gallery-thumbs .swiper-slide-active
        opacity: 1

    // .swiper-button-prev 
    //     background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z' fill='#E78127'/></svg>") !important
    

    // .swiper-button-next 
    //     background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z' fill='#E78127'/></svg>") !important
    
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
        +size(5)
        +size-md(12)
    
    .preview__descr
        +size(7)
        display: flex
        flex-direction: column
        margin-left: 10px
        +md-block
            margin-top: 50px

    .preview__descr-title
        font-family: 'Montserrat-SemiBold'
        font-weight: 600
        font-size: 28px
        margin: 0.5rem
    
    .preview__descr__descr-rating
        display: flex
        align-items: center
        margin-top: 20px

    .preview__descr-line
        width: 50px
        height: 2px
        background-color: black
        margin: 0.8rem
        margin-top: 20px
    
    .preview__descr-price
        margin: 0.8rem
</style>