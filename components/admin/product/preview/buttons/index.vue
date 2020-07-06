<template>
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
</template>

<script>
    
    const getSendFormStore = () => import('~/store/modules/product/send/form.js')
    const getSendImageStore = () => import('~/store/modules/product/send/image.js')
    const getSendOtherImageStore = () => import('~/store/modules/product/send/sendOtherImage.js')

    export default {
        data() {
            return {
                loading: false,
                image: null,
                counterImage: 0,
            }
        },
        computed: {
            name() {
                return this.$store.getters[`modules/product/name/name`]
            },
            price() {
                return this.$store.getters[`modules/product/price/price`]
            },
            descr() {
                return this.$store.getters[`modules/product/descr/descr`]
            },
            article() {
                return this.$store.getters[`modules/product/article/article`]
            },
            categories() {
                return this.$store.getters[`modules/product/categories/categories`]
            },
            discountStatus() {
                return this.$store.getters[`modules/product/discount/discountStatus`]
            },
            sizeDiscount() {
                return this.$store.getters[`modules/product/discount/sizeDiscount`]
            },
            newFields() {
                return this.$store.getters[`modules/product/newFields/newFields`]
            },
            other() {
                return this.$store.getters[`modules/product/other/other`]
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
            images() {
                return this.$store.getters[`modules/product/images/images`]
            },
            otherFieldImage() {
                return this.$store.getters[`modules/product/otherFieldImages/otherFieldImage`]
            },
            filterOtherFieldImage() {
                let arr = [];

                for(let i = 0; i < this.otherFieldImage.length; i++) {
                    arr.push({
                        title: this.otherFieldImage[i].title,
                        info: [],
                        token: this.otherFieldImage[i].token
                    })
                    for(let k = 0; k < this.otherFieldImage[i].info.length; k++) {
                        if(this.otherFieldImage[i].info[k].image.previewImg) {
                            arr[i].info.push(this.otherFieldImage[i].info[k])
                        }
                    }
                }

                return arr
            }
        },
        methods: {
            async sendData() {

                const vm = this

                // reset notification

                await this.$store.dispatch('modules/product/preview/main/resetNotifications')

                // show overlay

                await this.$store.dispatch('modules/product/preview/main/setOverlayChange', true)

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
                    moderationStatus: false,
                    idProduct: this.$store.getters['modules/product/edit/product'] ? 
                    this.$store.getters['modules/product/edit/product']._id :
                    false
                }

                //send form

                if(await !this.$store.getters['modules/product/send/form/status']) {
                    await this.$store.registerModule('product_send_form', getSendFormStore)
                }
                await this.$store.dispatch('modules/product/send/form/sendForm', fields)
                    .then(async (id) => {
                        if(!this.$store.getters['modules/product/send/image/status']) {
                            await this.$store.registerModule('product_send_image', getSendImageStore)
                        }

                        return id
                    }) 
                    .then(async (id) => {
                        if(id) {
                            const sendImages = await this.$store.dispatch('modules/product/send/image/sendImages',
                            id)

                            if(sendImages) {
                                return id
                            }

                        } else {
                            await this.$store.dispatch('modules/product/preview/main/setMessageStatus',
                            'При загрузке произошла ошибка! Попробуйте еще раз!')

                            await this.$store.dispatch('modules/product/preview/main/setCheckErrorImage',
                            'ID не найден!')

                            setTimeout(async () => {
                                await this.$store.dispatch('modules/product/preview/main/setOverlayChange',
                                    false)
                            }, 1000);
                        }
                    })
                    .then(async (id) => {
                        if(this.$store.getters['modules/product/otherFieldImages/otherFieldImage'].length > 0) {
                            if(await !this.$store.getters['modules/product/send/sendOtherImage/status']) {
                                await this.$store.registerModule('product_send_other_image', getSendOtherImageStore)
                            }

                            await this.$store.dispatch('modules/product/send/sendOtherImage/sendOtherImages', id)

                            this.$emit('overlayOff')

                        } else {
                            await this.$store.dispatch('modules/product/preview/main/setMessageStatus', 
                            'Загрузка завершена')
                            
                            await this.$store.dispatch('modules/product/preview/main/setProgressValue', 
                            100)

                            this.$emit('overlayOff')

                        }
                    })
                    .catch(async (e) => {
                        console.error(e)
                    })

            }
        }
    }
</script>

<style lang="sass">

</style>