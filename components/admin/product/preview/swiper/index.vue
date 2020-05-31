<template>
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
                <div class="preview__swiper-discount-price" v-if="discountStatus">
                    <span>-{{sizeDiscount}}%</span>
                </div>
                <div class="preview__swiper-info">
                    <div class="preview__swiper-info-stock" v-if="stock">
                        Акция
                    </div>
                    <div class="preview__swiper-info-stock preview__swiper-info-bestseller" v-if="bestseller">
                        Хит продаж
                    </div>
                    <div class="preview__swiper-info-stock preview__swiper-info-week-price" v-if="weekPrice">
                        Цена недели
                    </div>
                </div>
            </div>
            <div class="preview__swiper-images-wrapper">
                <app-product-preview-images 
                    v-for="(item, index) in imagesFilterArray"
                    :key="index"
                    :image="item.previewImg"
                    :index="index"
                    :mainIndex="mainIndex"
                    @changeImg="changeImg"

                />
            </div>
        </client-only>
    </div>
</template>

<script>
    
    const AppProductPreviewImages = () => import('~/components/admin/product/preview-images/index.vue')

    export default {
        data() {
            return {
                zoomStatus: false,
                bottom: 0,
                right: 0,
                mainIndex: '',
                resultSize: 'cover'
            }
        },
        components: {
            AppProductPreviewImages
        },
        props: [
            'img'
        ],
        computed: {
            images() {
                return this.$store.getters[`modules/product/images/images`]
            },
            discountStatus() {
                return this.$store.getters[`modules/product/discount/discountStatus`]
            },
            sizeDiscount() {
                return this.$store.getters[`modules/product/discount/sizeDiscount`]
            },
            stock() {
                return this.$store.getters[`modules/product/stock/stock`]
            },
            bestseller() {
                return this.$store.getters[`modules/product/bestseller/bestseller`]
            },
            weekPrice() {
                return this.$store.getters[`modules/product/weekPrice/weekPrice`]
            },
            mainImg() {
                if(this.img) {
                    if( typeof this.img === 'object') {
                        if(this.img.type === 'image/png' || this.img.type === 'image/jpeg') {
                            return URL.createObjectURL(this.img)
                        } 
                    } else if(typeof this.img === 'string'){
                        return require('~/assets/' + this.img)                   
                    }
                } else {
                    return ''
                }
                
            },
            imagesFilterArray() {
                let arr = [];

                for(let i = 0; i < this.images.length; i++) {
                    if(this.images[i].previewImg) {
                        arr.push(this.images[i])
                    }
                }

                return arr
            }
        },
        methods: {
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
            },
            async changeImg({mainIndex, image}) {
                this.$emit('changeImg', image)
                this.mainIndex = mainIndex
            }
        }
    }
</script>

<style lang="sass">

    .preview__swiper
        display: flex
        height: fit-content
        flex-direction: column
        align-items: center
        max-width: 450px
        margin-top: 15px
        +size(5)
        +lgX-block
            margin-top: 2%
        +size-md(6)
        +size-xs(11)
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)

    .preview__swiper-image-container
        overflow: hidden
        width: 100%
        position: relative
    
    .preview__swiper-image
        position: relative
        width: 100%
        padding-top: 100%
        transition: transform 0.2s
        cursor: pointer
    
    .preview__swiper-image-mouseenter
        transform: scale(2)
    
    .preview__swiper-discount-price
        width: 50px
        height: 50px
        color: white
        display: flex
        justify-content: center
        position: absolute
        align-items: center
        font-size: 16px
        background-color: rgba(255, 0, 0, 0.7)
        border-radius: 100%
        top: 3px
        right: 3px
        cursor: pointer
        z-index: 7
    
    .preview__swiper-info
        display: flex
        flex-direction: column
        position: absolute
        top: 0px
        left: 0px
        padding-left: 10px
        padding-right: 10px
        cursor: pointer
        z-index: 7
    
    .preview__swiper-info-stock
        width: 130px
        height: 22px
        margin-top: 10px
        color: white
        display: flex
        justify-content: center
        align-items: center
        text-transform: uppercase
        background-color: rgba(255, 0, 0, 0.7)
        font-size: 12px
    
    .preview__swiper-info-bestseller
        background-color: rgba(255, 168, 0, 0.7)
    
    .preview__swiper-info-week-price
        background-color: rgba(0, 194, 255, 0.7)
    
    .preview__swiper-images-wrapper
        display: flex
        align-items: center
        width: 100%
        justify-content: center
        margin-top: 5%
        margin-bottom: 5%
</style>