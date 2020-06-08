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
                    idProduct: this.$store.getters['modules/product/edit/product']._id ? 
                    this.$store.getters['modules/product/edit/product']._id :
                    false
                }

                //send form

                if(!this.$store.getters['modules/product/send/form/status']) {
                    await this.$store.registerModule('product_send_form', getSendFormStore)
                }
                console.log('sendForm')
                await this.$store.dispatch('modules/product/send/form/sendForm', fields)
                    .then(async function(id) {
                        if(!vm.$store.getters['modules/product/send/image/status']) {
                            await vm.$store.registerModule('product_send_image', getSendImageStore)
                        }

                        if(id) {
                            console.log('sendImages')
                            return await vm.$store.dispatch('modules/product/send/image/sendImages',
                             {id, images: vm.images})
                        } else {
                            await vm.$store.dispatch('modules/product/preview/main/setMessageStatus',
                            'При загрузке произошла ошибка! Попробуйте еще раз!')

                            await vm.$store.dispatch('modules/product/preview/main/setCheckErrorImage',
                            'ID не найден!')

                            setTimeout(async function() {
                                await vm.$store.dispatch('modules/product/preview/main/setOverlayChange',
                                    false)
                            }, 1000);
                        }

                    })
                    .then(async function(id) {
                        console.log('sendImages проверка')
                        if(vm.$store.getters['modules/product/send/sendOtherImage/images'].length > 0) {
                            console.log('sendImages')
                            if(!vm.$store.getters['modules/product/send/sendOtherImage/status']) {
                                await vm.$store.registerModule('product_send_other_image', getSendOtherImageStore)
                            }

                            await vm.$store.dispatch('modules/product/send/sendOtherImage/sendOtherImages', id)
                        } else {
                            await vm.$store.dispatch('modules/product/preview/main/setMessageStatus', 
                            'Загрузка завершена')
                            
                            await vm.$store.dispatch('modules/product/preview/main/setProgressValue', 
                            100)

                            setTimeout(async function() {
                                await vm.$store.dispatch('modules/product/preview/main/setOverlayChange',
                                    false)
                                
                                await vm.$store.dispatch('modules/alert/snackbar/setMessage', 'success')

                                setTimeout(async function() {
                                    window.location.reload(true)
                                }, 2000);
                            }, 1000);
                        }
                    })

            }
            // async sendData() {
                
            //     // reset notifications

            //     let data = {
            //         message: false,
            //         snackbar: false,
            //         progressValue: 0,
            //         checkErrorForm: false,
            //         checkErrorImage: false,
            //     }

            //     this.$store.dispatch('modules/preview/resetNotifications', data)

                

            //     // show overlay

            //     this.$store.dispatch('modules/preview/overlayChange', true)

            //     //preparation data

            //     let fields = {
            //         name: this.name,
            //         price: this.price,
            //         descr: this.descr,
            //         article: this.article,
            //         categories: this.categories,
            //         discountStatus: this.discountStatus,
            //         sizeDiscount: this.sizeDiscount,
            //         newFields: this.newFields,
            //         other: this.other,
            //         stock: this.stock,
            //         bestseller: this.bestseller,
            //         weekPrice: this.weekPrice,
            //         idProduct: this.$store.getters['modules/product/edit/product']._id ? 
            //         this.$store.getters['modules/product/edit/product']._id :
            //         false
            //     }

            //     //send form

            //     let resultForm,
            //         resultImage;

            //     resultForm = await this.sendForm(fields)

            //     //send images

            //     if(resultForm) {
            //         resultImage = await this.sendImage(resultForm)
            //     }

            // },
            // async sendForm(fields) {

            //     let vm = this
            //     let result;

            //     // change loading bar
            //     await this.$emit('changeProgressValue', 40)

            //     //change message status
            //     await this.$emit('changeMessageStatus', 'Загрузка основных данных...')

            //     try {
            //        const responseFields = await this.$axios.$post('/api/product/create/fields', fields)
            //        console.log(responseFields)
            //        await this.$emit('changeMessageStatus', responseFields.message )

            //        if(responseFields.error === 'true') {

            //             await this.$emit('changeCheckErrorForm', true)

            //             setTimeout(() => {
            //                 vm.$emit('overlayOffError')
            //             }, 1000);

            //             return false
            //        } else {
            //             this.$emit('changeCheckErrorForm', false)
            //             let id = responseFields.product._id
            //             return id
            //        }
            //     } catch(e) {
            //         console.error('Error: Упс! Что то пошло не так!', e)

            //         this.$emit('changeMessageStatus', 'Упс! Что то пошло не так!' )

            //         setTimeout(() => {
            //             vm.$emit('overlayOffError')
            //         }, 1000);
            //     }
            // },
            // async sendImage(id) {
            //     let vm = this

            //     await this.$store.dispatch(`modules/product/images/imagesFilter`)


            //     for(let i = 0; i < this.images.length; i++) {

            //         this.image = this.images[i].previewImg

            //         await this.$emit('changeMessageStatus', `Загрузка картинок ${i + 1} из ${this.images.length}...` )

            //         if(typeof this.image === 'object') {
                        
            //             if(this.image.type === 'image/png' || this.image.type === 'image/jpeg') {
            //                 var readerPreview = new FileReader();

            //                 readerPreview.onload = async function(e) {
            //                     let data = {
            //                         image: e.target.result,
            //                         index: i,
            //                         id: id
            //                     }

            //                     try {
            //                         const responseImages = await vm.$axios.$post('/api/product/create/images', data)
            //                         vm.counterImage++
            //                     } catch(e) {
            //                         await vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка! Попробуйте еще раз!' )

            //                         await vm.$emit('changeCheckErrorImage', e)

            //                         setTimeout(() => {
            //                             vm.$emit('overlayOffError')
            //                         }, 1000);

            //                         console.error(e);
            //                     }


            //                     if(vm.counterImage === vm.images.length) {

            //                         await vm.$emit('changeProgressValue', 60)

            //                         if(vm.otherFieldImage.length > 0) {
            //                             await vm.sendOtherImage(id)
            //                         } else {
            //                             await vm.$emit('changeMessageStatus', 'Загрузка завершена' )

            //                             await vm.$emit('changeProgressValue', 100)

            //                             setTimeout(() => {
            //                                 vm.$emit('overlayOff')
            //                             }, 1000);

            //                         }
                                    
            //                     }
                                
            //                 }

            //                 await readerPreview.readAsDataURL(this.image);
            //             } 
            //         } else {
            //             let data = {
            //                 image: vm.image,
            //                 index: i,
            //                 id: id
            //             }
                        
            //             try {
            //                 const responseImages = await vm.$axios.$post('/api/product/create/images', data)
            //                 vm.counterImage++
            //             } catch(e) {
            //                 await vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка! Попробуйте еще раз!' )
            //                 await vm.$emit('changeCheckErrorImage', error)

            //                 setTimeout(() => {
            //                     vm.$emit('overlayOffError')
            //                 }, 1000);

            //                 console.error('Error:', e);
            //             }
                        
            //             if(vm.counterImage === vm.images.length) {

            //                 await vm.$emit('changeProgressValue', 60)

            //                 if(vm.otherFieldImage.length > 0) {
            //                     await vm.sendOtherImage(id)
            //                 } else {
            //                     await vm.$emit('changeMessageStatus', 'Загрузка завершена' )

            //                     await vm.$emit('changeProgressValue', 100)

            //                     setTimeout(() => {
            //                         vm.$emit('overlayOff')
            //                     }, 1000);

            //                 }
                            
            //             }
            //         }
                    
            //     }
            
            // },
            // async sendOtherImage(id) {
            //     let vm = this
            //     let checkError = false
            //     let newId = false
            //     let mainId = id

            //     console.log(this.filterOtherFieldImage)

            //     for(let k = 0; k < this.filterOtherFieldImage.length; k++) {
            //         let counter = 0
            //         let otherImage = this.filterOtherFieldImage[k]

            //         let data = {
            //             id: id,
            //             title: otherImage.title
            //         }
            //         if(checkError === false) {
            //             try {
            //                 console.log('1')
            //                 const responseImageTitle = await this.$axios.$post('/api/product/create/other-image-title', data)
            //                 console.log('2')
            //                 await this.$emit('changeMessageStatus', 'Подготовка загрузки дополнительных изображений...' )
            //                 console.log('3')
            //                 console.log(mainId)
            //                 const responseProductId = await this.$axios.$get('/api/product/get-product-id', {params : { id: mainId }})
            //                 console.log('4')
            //                 console.log(responseProductId)
            //                 console.log(responseProductId.otherFieldImage[k]._id)
            //                 newId = responseProductId.otherFieldImage[k]._id
            //                 console.log('5')
            //                 for(let i = 0; i < otherImage.info.length; i++) {
            //                     console.log('6')
            //                     let image = otherImage.info[i].image.previewImg
            //                     console.log('7')
            //                     var readerPreview = new FileReader();

            //                     if(typeof image === "object") {
            //                         console.log('image is object')

            //                         if(image.type === 'image/png' || image.type === 'image/jpeg') {

            //                             readerPreview.onload = async function(e) {

            //                                 if(checkError === false) {
            //                                     await vm.$emit('changeMessageStatus', `Загрузка картинок из раздела '${otherImage.title}'  ${i + 1} из ${otherImage.info.length}...` )

            //                                     data = {
            //                                         image: e.target.result,
            //                                         id: id,
            //                                         newId: newId,
            //                                         title: otherImage.info[i].title,
            //                                         index: i,
            //                                         globalIndex: k
            //                                     }
                                                
            //                                     try {
            //                                         const responseOtherImages = await vm.$axios.$post('/api/product/create/other-images', data)
            //                                         counter++
            //                                     } catch(e) {
            //                                         await vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )
            //                                         checkError = e

            //                                         setTimeout(() => {
            //                                             vm.$emit('overlayOffError')
            //                                         }, 1000);

            //                                         console.error('Error:', e);
            //                                     }
            //                                 } else {
            //                                     return checkError
            //                                 }

            //                             }

            //                             await readerPreview.readAsDataURL(image);
            //                         } else {
            //                             await vm.$emit('changeMessageStatus', `При загрузке произошла ошибка! Неверный формат у '${image.name}'` )

            //                             checkError = 'При загрузке произошла ошибка!'

            //                             setTimeout(() => {
            //                                 vm.$emit('overlayOffError')
            //                             }, 1000);

            //                             console.error('Error:', checkError);
            //                         }
            //                     } else {
            //                         if(checkError === false) {

            //                             await vm.$emit('changeMessageStatus', `Загрузка картинок из раздела '${otherImage.title}'  ${i + 1} из ${otherImage.info.length}...` )
                                        
            //                             data = {
            //                                 image: image,
            //                                 id: id,
            //                                 newId: newId,
            //                                 title: otherImage.info[i].title,
            //                                 index: i,
            //                                 globalIndex: k
            //                             }

            //                             try {
            //                                 const responseOtherImages = await vm.$axios.$post('/api/product/create/other-images', data)
            //                                 counter++
            //                             } catch(e) {
            //                                 await vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )
            //                                 checkError = e
            //                                 setTimeout(() => {
            //                                     vm.$emit('overlayOffError')
            //                                 }, 1000);
            //                                 console.error('Error:', e)
            //                             }
            //                         } else {
            //                             return checkError
            //                         }

            //                     }
            //                 }
            //             } catch(e) {
            //                 await this.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )
            //                 checkError = e

            //                 setTimeout(() => {
            //                     vm.$emit('overlayOffError')
            //                 }, 1000);

            //                 console.error('Error:', e)
            //             }
                        
            //         } else {
            //             return checkError
            //         }
                    
            //         if(k + 1 === this.otherFieldImage.length) {

            //             await vm.$emit('changeProgressValue', 100)

            //             await vm.$emit('changeMessageStatus', 'Загрузка завершена!' )

            //             setTimeout(() => {
            //                 vm.$emit('overlayOff')
            //             }, 1000);
                        
            //         }

            //     }

                
            // },
        }
    }
</script>

<style lang="sass">

</style>