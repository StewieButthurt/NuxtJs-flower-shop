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
                                :image="item.previewImg"
                                :index="index"
                                :mainIndex="mainIndex"
                                @changeImg="changeImg"

                            />
                        </div>
                    </client-only>
                </div>
                <div class="preview__descr">
                    <div class="preview__descr-title">
                        {{name}}
                    </div>
                    <div class="preview__descr__descr-rating">
                        <v-rating 
                            v-model="rating"
                            readonly
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
                        {{descr}}
                    </div>
                    <div class="preview__descr-article">
                        артикул <span>{{article}}</span>
                    </div>
                    <div class="preview__field-with-image">
                        <app-preview-field-with-image 
                            v-for="(item, index) in otherFieldImage"
                            :key="item.title"
                            :index="index"
                            :title="item.title"
                            :info="item.info"
                            @mouseEnterImage="mouseEnterImage"
                        />
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
                        <div class="preview__descr__counter-wrapper-buttons mr-5 mt-5">
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
                        </div>
                        <v-btn
                            color="#7CAA1A"
                            :disabled="true"
                            class="white--text preview__descr__buttons-card mt-5"
                        >
                            <v-icon class="mr-3" size="24px" right dark>mdi-cart-outline</v-icon>
                            В корзину
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class="preview__specifications">
                <div class="preview__specifications-tabs">
                    <v-tabs
                        color="black"
                    >
                        <v-tab @click="clickDescr()">Описание</v-tab>
                        <v-tab @click="clickReviews()">Отзывы</v-tab>
                    </v-tabs>
                    <div class="preview__specifications-tabs-line">
                    </div>
                </div>
                <transition name="itemIn" mode="out-in">
                    <div key="vtabDescr" class="preview__characterisctics-wrapper" v-if="vtabDescr">
                        <app-preview-characteristics 
                            v-for="(item, index) in other"
                            :key="item.title"
                            :index="index"
                            :title="item.title"
                            :descr="item.descr"
                        />
                    </div>
                    <div key="vtabReviews" class="preview__characterisctics-wrapper" v-if="vtabReviews">
                        Здесь будут отзывы
                    </div>
                </transition>
            </div>
            <v-row justify="center" align="center">
                <v-btn class="mx-2 mt-5" 
                    dark
                    @click="$router.back()"
                    >
                    <v-icon dark left>mdi-arrow-left</v-icon>
                    Назад
                </v-btn>
                <v-btn class="mx-2 mt-5" 
                    color="teal"
                    :loading="loading"
                    @click="sendForm()"
                    >
                        <v-icon class="mr-2">mdi-content-save</v-icon>
                        Сохранить
                </v-btn>
            </v-row>
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
    const AppProductPrice = () => import('~/components/admin/product-price/index.vue')
    const AppProductOtherField = () => import('~/components/admin/product-other-field/index.vue')
    const AppProductPreviewImages = () => import('~/components/admin/product-preview-images/index.vue')
    const AppPreviewFieldWithImage = () => import('~/components/admin/product-other-field-with-image/preview-field-with-image.vue')
    const AppPreviewCharacteristics = () => import('~/components/admin/product-characteristics/preview-characteristics.vue')
    const AppSnackbars = () => import('~/components/alerts/snackbar-http/index.vue')


    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Предпросмотр'
        },
        components: {
            AppProductPrice,
            AppProductOtherField,
            AppProductPreviewImages,
            AppPreviewFieldWithImage,
            AppPreviewCharacteristics,
            AppSnackbars
        },
        middleware: 'checkData',
        async mounted() {
            this.mainImg = this.images[0].previewImg
        },
        data() {
            return {
                rating: 0,
                counterProducts: 1,
                mainImg: '',
                mainIndex: '',
                zoomStatus: false,
                x: '',
                y: '',
                bottom: 0,
                right: 0,
                resultSize: 'cover',
                vtabDescr: true,
                vtabReviews: false,
                text: '',
                colorBtn: '',
                colorBckg: '',
                snackbar: false,
                message: false,
                loading: false,
                overlay: false,
                messageStatus: 'Начало загрузки...',
                progressValue: 0
            }
        },
        computed: {
            images() {
                return this.$store.getters['add-product/images']
            },
            img() {
                return this.mainImg
            },
            name() {
                return this.$store.getters['add-product/name']
            },
            price() {
                return this.$store.getters['add-product/price']
            },
            descr() {
                return this.$store.getters['add-product/descr']
            },
            other() {
                return this.$store.getters['add-product/other']
            },
            article() {
                return this.$store.getters['add-product/article']
            },
            newFields() {
                return this.$store.getters['add-product/newFields']
            },
            sizeDiscount() {
                return this.$store.getters['add-product/sizeDiscount']
            },
            discountStatus() {
                return this.$store.getters['add-product/discountStatus']
            },
            bestseller() {
                return this.$store.getters['add-product/bestseller']
            },
            stock() {
                return this.$store.getters['add-product/stock']
            },
            weekPrice() {
                return this.$store.getters['add-product/weekPrice']
            },
            otherFieldImage() {
                return this.$store.getters['add-product/otherFieldImage']
            },
            categories() {
                return this.$store.getters['add-product/categories']
            }


        },
        methods: {
            async sendForm() {
                this.message = false
                this.snackbar = false
                this.progressValue = 0

                // this.loading = true
                this.overlay = true
                let vm = this

                let fields = {
                    name: this.name,
                    price: this.price,
                    descr: this.descr,
                    article: this.article,
                    categories: this.categories,
                    discountStatus: this.discountStatus,
                    sizeDiscount: this.sizeDiscount,
                    newFields: this.newFields,
                    other: this.other,
                    stock: this.stock,
                    bestseller: this.bestseller,
                    weekPrice: this.weekPrice,
                }

                this.progressValue = 40
                this.messageStatus = 'Загрузка основных данных...'

                await this.$axios.$post('/api/product/create/fields', fields)
                    .then(async function (response) {
                                if(response.message === 'busy') {
                                    vm.messageStatus = 'При загрузке произошла ошибка! Название занято!'
                                    checkError = error
                                    setTimeout(vm.overlayOffError, 1000)
                                } else {
                                    let id = response.product._id
                                    vm.sendImage(id)
                                }
                    })
                    .catch(function (error) {
                        vm.messageStatus = 'При загрузке произошла ошибка! Название занято!'
                        setTimeout(vm.overlayOffError, 1000)
                        console.log(error);
                    })
            },
            async sendImage(id) {
                let vm = this
                let counter = 0
                let checkError = false

                for(let i = 0; i < this.images.length; i++) {

                    let image = this.images[i].previewImg
                    
                    
                    if(checkError === false) {
                        this.messageStatus = `Загрузка картинок ${i + 1} из ${this.images.length}...`
                        
                        let data = {
                            image: image,
                            index: i,
                            id: id
                        }

                        await this.$axios.$post('/api/product/create/images', data)
                            .then(async function (response) {
                                    counter++
                            })
                            .catch(function (error) {
                                vm.messageStatus = 'При загрузке произошла ошибка! Попробуйте еще раз!'
                                checkError = error
                                setTimeout(vm.overlayOffError, 1000)
                                console.log(error);
                                throw error
                            })
                    } else {
                        return checkError
                    }

                    if(counter === this.images.length) {
                        this.progressValue = 60

                        if(this.otherFieldImage.length > 0) {
                            this.sendOtherImage(id)
                        } else {
                            this.messageStatus = 'Загрузка завершена'
                            this.progressValue = 100
                            setTimeout(this.overlayOff, 1000)
                        }
                        
                    }
                }
            
            },
            async sendOtherImage(id) {
                let vm = this
                let checkError = false
                let newId = false
                let mainId = id

                for(let k = 0; k < this.otherFieldImage.length; k++) {
                    let counter = 0
                    let otherImage = this.otherFieldImage[k]

                    let data = {
                        id: id,
                        title: otherImage.title
                    }
                    if(checkError === false) {
                        await this.$axios.$post('/api/product/create/other-image-title', data)
                            .then(async function (response) {
                                    vm.messageStatus = 'Подготовка загрузки дополнительных изображений...'

                                    
                                    await vm.$axios.$get('/api/product/get-product-id', {params : { id: mainId }})
                                        .then(async function (response) {
                                                newId = response.otherFieldImage[k]._id
                                        })
                                        .catch(function (error) {
                                            // handle error
                                            // vm.message = 'error'
                                            // vm.loading = false
                                            vm.messageStatus = 'При загрузке произошла ошибка!'
                                            checkError = error
                                            setTimeout(vm.overlayOffError, 1000)
                                            console.log(error);
                                            throw error
                                        })

                                        

                                    for(let i = 0; i < otherImage.info.length; i++) {

                                            let image = otherImage.info[i].image.previewImg
                                            

                                            if(checkError === false) {
                                                vm.messageStatus = `Загрузка картинок из раздела '${otherImage.title}'  ${i + 1} из ${otherImage.info.length}...`
                                                
                                                data = {
                                                    image: image,
                                                    id: id,
                                                    newId: newId,
                                                    title: otherImage.info[i].title,
                                                    index: i,
                                                    globalIndex: k
                                                }

                                                await vm.$axios.$post('/api/product/create/other-images', data)
                                                    .then(async function (response) {
                                                                counter++
                                                    })
                                                    .catch(function (error) {
                                                        // handle error
                                                        // vm.message = 'error'
                                                        // vm.loading = false
                                                        vm.messageStatus = 'При загрузке произошла ошибка!'
                                                        checkError = error
                                                        setTimeout(vm.overlayOffError, 1000)
                                                        console.log(error);
                                                        throw error
                                                    })
                                            } else {
                                                return checkError
                                            }
                                            
                                        }
                            })
                            .catch(function (error) {
                                // handle error
                                // vm.message = 'error'
                                // vm.loading = false
                                vm.messageStatus = 'При загрузке произошла ошибка!'
                                checkError = error
                                setTimeout(vm.overlayOffError, 1000)
                                console.log(error);
                                throw error
                            })
                    } else {
                        return checkError
                    }
                    
                    console.log('k = ', k)
                    if(k + 1 === this.otherFieldImage.length) {
                        this.progressValue = 100
                        this.messageStatus = 'Загрузка завершена!'
                        setTimeout(this.overlayOff, 1000)
                    }

                }

                
            },
            async overlayOffError() {
                this.overlay = false
            },
            async overlayOff() {
                this.overlay = false
                this.message = 'success'
                setTimeout(this.redirectAddProduct, 2000)
            },
            async redirectAddProduct() {
                window.location.reload(true)
            },
            async getImages() {
                await this.$store.dispatch('image-preview/getImage')
            },
            async counterPlus() {
                if(this.counterProducts < 10) {
                    this.counterProducts++
                }
            },
            async counterMinus() {
                if(this.counterProducts > 1) {
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
            },
            async mouseEnterImage(img) {
                this.mainImg = img
            },
            async clickDescr() {
                this.vtabReviews = false
                this.vtabDescr = true

            },
            async clickReviews() {
                this.vtabDescr = false
                this.vtabReviews = true
            },
            async changeSnackbar(value) {
                this.snackbar = value
            },
            async redirectMenuEdit() {
                this.$router.push('/admin/products/')
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
    
    .preview__swiper
        display: flex
        flex-direction: column
        align-items: center
        max-width: 450px
        margin-top: 15px
        +size(5)
        +lgX-block
            margin-top: 2%
        +size-md(6)
        +size-xs(11)
    
    .preview__descr
        +size(6)
        display: flex
        flex-direction: column
        margin-left: 40px
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
    
    .preview__descr__buttons
        display: flex
        align-items: center
        margin: 0.8rem
        flex-wrap: wrap
    
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
        position: relative
    
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
    
    .preview__swiper-info
        display: flex
        flex-direction: column
        position: absolute
        top: 0px
        left: 0px
        padding-left: 10px
        padding-right: 10px
        cursor: pointer
    
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
    
    .preview__specifications
        +size(11)
        +size-md(10)
        +md-block
            padding: 0.8rem
        display: flex
        flex-direction: column
        +size-xs(12)
    
    .preview__specifications-tabs
        position: relative
        margin-top: 70px
    
    .preview__specifications-tabs-line
        position: absolute
        top: 48px
        height: 1px
        background-color: #C8C8C8
        width: 100%
    
    .preview__field-with-image
        margin: 0.8rem
        display: flex
        flex-direction: column
    
    .preview__characterisctics-wrapper
        display: flex
        flex-direction: column
        margin-top: 30px
        max-width: 961px
    
    .itemIn-enter-active, .itemIn-leave-active 
        transition: opacity .3s
    
    .itemIn-enter, .itemIn-leave-to
        opacity: 0
    
    .preview__descr__counter-wrapper-buttons
        display: flex
    
    .preview-image-overlay
        display: flex
        width: 300px
        justify-content: center
        align-items: center
        flex-direction: column
        text-align: center
</style>