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
    export default {
        data() {
            return {
                loading: false,
                image: null,
                counterImage: 0,
            }
        },
        props: [
            'storeUrl'
        ],
        computed: {
            name() {
                return this.$store.getters[`${this.storeUrl}name`]
            },
            price() {
                return this.$store.getters[`${this.storeUrl}price`]
            },
            descr() {
                return this.$store.getters[`${this.storeUrl}descr`]
            },
            article() {
                return this.$store.getters[`${this.storeUrl}article`]
            },
            categories() {
                return this.$store.getters[`${this.storeUrl}categories`]
            },
            discountStatus() {
                return this.$store.getters[`${this.storeUrl}discountStatus`]
            },
            sizeDiscount() {
                return this.$store.getters[`${this.storeUrl}sizeDiscount`]
            },
            newFields() {
                return this.$store.getters[`${this.storeUrl}newFields`]
            },
            other() {
                return this.$store.getters[`${this.storeUrl}other`]
            },
            stock() {
                return this.$store.getters[`${this.storeUrl}stock`]
            },
            bestseller() {
                return this.$store.getters[`${this.storeUrl}bestseller`]
            },
            weekPrice() {
                return this.$store.getters[`${this.storeUrl}weekPrice`]
            },
            images() {
                return this.$store.getters[`${this.storeUrl}images`]
            },
            otherFieldImage() {
                return this.$store.getters[`${this.storeUrl}otherFieldImage`]
            }
        },
        methods: {
            async sendData() {
                
                // reset notifications

                let data = {
                    message: false,
                    snackbar: false,
                    progressValue: 0,
                    checkErrorForm: false,
                    checkErrorImage: false,
                }

                this.$emit('resetNotifications', data)

                

                // show overlay

                this.$emit('overlayChange', true)

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

                // change loading bar
                this.$emit('changeProgressValue', 40)

                //change message status
                this.$emit('changeMessageStatus', 'Загрузка основных данных...')

                return await this.$axios.$post('/api/product/create/fields', fields)
                    .then(async function (response) {

                        //change message status
                        vm.$emit('changeMessageStatus', response.message )
                        
                        if(response.error === 'true') {

                            console.log(`Бэкенд ошибка: ${response.message}`)

                            vm.$emit('changeCheckErrorForm', true)

                            setTimeout(() => {
                                vm.$emit('overlayOffError')
                            }, 1000);

                            return false

                        } else {
                            console.log(`Отправка основных данных успешна: ${response.message}`)
                            vm.$emit('changeCheckErrorForm', false)
                            let id = response.product._id
                            return id
                        }
                    })
                    .catch(function (error) {

                        console.log('Упс! Что то пошло не так!')

                        vm.$emit('changeMessageStatus', 'Упс! Что то пошло не так!' )

                        setTimeout(() => {
                            vm.$emit('overlayOffError')
                        }, 1000);

                        console.log(error);

                    })
            },
            async sendImage(id) {
                let vm = this

                await this.$store.dispatch(`${this.storeUrl}imagesFilter`)


                for(let i = 0; i < this.images.length; i++) {

                    this.image = this.images[i].previewImg

                    this.$emit('changeMessageStatus', `Загрузка картинок ${i + 1} из ${this.images.length}...` )

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

                            vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка! Попробуйте еще раз!' )

                            vm.$emit('changeCheckErrorImage', error)

                            setTimeout(() => {
                                vm.$emit('overlayOffError')
                            }, 1000);

                            console.log(error);

                            throw error
                        })


                        if(vm.counterImage === vm.images.length) {

                            vm.$emit('changeProgressValue', 60)

                            if(vm.otherFieldImage.length > 0) {
                                vm.sendOtherImage(id)
                            } else {
                                vm.$emit('changeMessageStatus', 'Загрузка завершена' )

                                vm.$emit('changeProgressValue', 100)

                                setTimeout(() => {
                                    vm.$emit('overlayOff')
                                }, 1000);

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
                                vm.$emit('changeMessageStatus', 'Подготовка загрузки дополнительных изображений...' )
                                
                                await vm.$axios.$get('/api/product/get-product-id', {params : { id: mainId }})
                                    .then(async function (response) {
                                            newId = response.otherFieldImage[k]._id
                                    })
                                    .catch(function (error) {

                                        vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )

                                        checkError = error

                                        setTimeout(() => {
                                            vm.$emit('overlayOffError')
                                        }, 1000);

                                        console.log(error);

                                        throw error

                                    })

                                    

                                for(let i = 0; i < otherImage.info.length; i++) {

                                        let image = otherImage.info[i].image.previewImg
                                        

                                        if(checkError === false) {

                                            vm.$emit('changeMessageStatus', `Загрузка картинок из раздела '${otherImage.title}'  ${i + 1} из ${otherImage.info.length}...` )
                                            
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
                                                    vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )

                                                    checkError = error

                                                    setTimeout(() => {
                                                        vm.$emit('overlayOffError')
                                                    }, 1000);

                                                    console.log(error);

                                                    throw error
                                                })
                                        } else {
                                            return checkError
                                        }
                                        
                                    }
                            })
                            .catch(function (error) {
                                vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )

                                checkError = error

                                setTimeout(() => {
                                    vm.$emit('overlayOffError')
                                }, 1000);

                                console.log(error);

                                throw error
                            })
                    } else {
                        return checkError
                    }
                    
                    if(k + 1 === this.otherFieldImage.length) {

                        vm.$emit('changeProgressValue', 100)

                        vm.$emit('changeMessageStatus', 'Загрузка завершена!' )

                        setTimeout(() => {
                            vm.$emit('overlayOff')
                        }, 1000);
                        
                    }

                }

                
            },
        }
    }
</script>

<style lang="sass">

</style>