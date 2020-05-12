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
                    v-for="(item, index) in images"
                    :key="index"
                    v-if="item.previewImg"
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
        async mounted() {
            this.img = this.images[0].previewImg
        },
        data() {
            return {
                zoomStatus: false,
                bottom: 0,
                right: 0,
                img: null,
                mainIndex: '',
                resultSize: 'cover'
            }
        },
        components: {
            AppProductPreviewImages
        },
        props: [
            'storeUrl'
        ],
        computed: {
            images() {
                return this.$store.getters[`${storeUrl}images`]
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
            discountStatus() {
                return this.$store.getters[`${storeUrl}discountStatus`]
            },
            sizeDiscount() {
                return this.$store.getters[`${storeUrl}sizeDiscount`]
            },
            stock() {
                return this.$store.getters[`${storeUrl}stock`]
            },
            bestseller() {
                return this.$store.getters[`${storeUrl}bestseller`]
            },
            weekPrice() {
                return this.$store.getters[`${storeUrl}weekPrice`]
            },
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
                this.img = image
                this.mainIndex = mainIndex
            }
        }
    }
</script>

<style lang="sass">

</style>