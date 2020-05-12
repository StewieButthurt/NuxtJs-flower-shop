<template>
    <div class="preview-container" id="preview-container">
        <div class="preview-wrapper">

            <div class="preview__swiper-descr">

                <app-swiper 
                    :storeUrl="storeUrl"
                    @changeImg="changeImg"
                />

                <app-description 
                    :storeUrl="storeUrl"
                    @mouseEnterImage="mouseEnterImage"
                />




                

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
                            :storeUrl="storeUrl"
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
                    @click="sendData()"
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
    const AppSwiper = () => import('~/components/admin/product/preview/swiper/index.vue')
    const AppDescription = () => import('~/components/admin/product/preview/description/index.vue')
    const AppProductOtherField = () => import('~/components/admin/product/other-field/index.vue')
    const AppPreviewCharacteristics = () => import('~/components/admin/product/characteristics/preview-characteristics.vue')
    const AppSnackbars = () => import('~/components/alerts/snackbar-http/index.vue')


    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Предпросмотр'
        },
        components: {
            AppSwiper,
            AppDescription,
            AppProductOtherField,
            AppPreviewCharacteristics,
            AppSnackbars
        },
        middleware: 'checkData',
        async mounted() {
            this.img = this.images[0].previewImg
        },
        data() {
            return {
                storeUrl: 'product/add/',
                img: null,
                image: null,
                counterImage: 0,
                x: '',
                y: '',
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
                progressValue: 0,
                checkErrorForm: false,
                checkErrorImage: false,

            }
        },
        computed: {
            images() {
                return this.$store.getters['product/add/images']
            },
            other() {
                return this.$store.getters['product/add/other']
            },
            categories() {
                return this.$store.getters['product/add/categories']
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


        },
        methods: {
            async mouseEnterImage(img) {
                this.img = img
            },
            async changeImg(image) {
                this.img = image
            },
            async sendData() {
                
                // reset notifications

                this.message = false
                this.snackbar = false
                this.progressValue = 0
                this.checkErrorForm = false
                this.checkErrorImage = false

                // show overlay

                this.overlay = true

                //preparation data

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

                //send form

                let resultForm,
                    resultImage;

                resultForm = await this.sendForm(fields)

                console.log(`Результат SendForm - ${resultForm}`)

                if(resultForm) {
                    resultImage = await this.sendImage(resultForm)
                }

                if(resultImage) {
                    console.log(`Пока всек ок: ${resultImage}`)
                } else {
                    console.log(`ЕБАННЫЙ РОТ БЛЯТЬ!`)
                }

                

                
            },
            async sendForm(fields) {

                let vm = this
                let result;

                this.progressValue = 40
                this.messageStatus = 'Загрузка основных данных...'

                return await this.$axios.$post('/api/product/create/fields', fields)
                    .then(async function (response) {
                                vm.messageStatus = response.message 
                                
                                if(response.error === 'true') {
                                    console.log(`Бэкенд ошибка: ${vm.messageStatus}`)
                                    vm.checkErrorForm = true
                                    setTimeout(vm.overlayOffError, 1000)
                                    return false
                                } else {
                                    console.log(`Отправка основных данных успешна: ${vm.messageStatus}`)
                                    vm.checkErrorForm = false
                                    let id = response.product._id
                                    return id
                                }
                    })
                    .catch(function (error) {
                        console.log('Упс! Что то пошло не так!')
                        vm.messageStatus = 'Упс! Что то пошло не так!'
                        setTimeout(vm.overlayOffError, 1000)
                        console.log(error);
                    })
            },
            async sendImage(id) {
                let vm = this

                await this.$store.dispatch(`${this.storeUrl}imagesFilter`)


                for(let i = 0; i < this.images.length; i++) {

                    this.image = this.images[i].previewImg
                    
                    this.messageStatus = `Загрузка картинок ${i + 1} из ${this.images.length}...`

                    var readerPreview = new FileReader();

                    readerPreview.onload = async function(e) {
                         let data = {
                            image: e.target.result,
                            index: i,
                            id: id
                        }

                        await vm.$axios.$post('/api/product/create/images', data)
                        .then(function (response) {
                                vm.counterImage++
                                console.log(`counter ++`)
                        })
                        .catch(function (error) {
                            vm.messageStatus = 'При загрузке произошла ошибка! Попробуйте еще раз!'
                            vm.checkErrorImage = error
                            setTimeout(vm.overlayOffError, 1000)
                            console.log(error);
                            throw error
                        })


                        if(vm.counterImage === vm.images.length) {
                            vm.progressValue = 60

                            if(vm.otherFieldImage.length > 0) {
                                vm.sendOtherImage(id)
                            } else {
                                vm.messageStatus = 'Загрузка завершена'
                                vm.progressValue = 100
                                setTimeout(vm.overlayOff, 1000)
                            }
                            
                        }
                         
                    }

                    await readerPreview.readAsDataURL(this.image);

                    
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
                                vm.messageStatus = 'При загрузке произошла ошибка!'
                                checkError = error
                                setTimeout(vm.overlayOffError, 1000)
                                console.log(error);
                                throw error
                            })
                    } else {
                        return checkError
                    }
                    
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
            }
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
    
    .preview__characterisctics-wrapper
        display: flex
        flex-direction: column
        margin-top: 30px
        max-width: 961px
    
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