<template>
    <div class="edit">
        <v-container fluid align-center>
            <v-row>
                <v-col >
                    <div class="font-weight-bold title text-center">
                        Обязательные поля
                    </div>
                </v-col>
            </v-row>

            <app-name-product />

            <app-price-product />

            <app-descr-product />
            
            <app-article-product />

            <app-categories-product />

            <app-discount-product />

            <app-stock-product />

            <app-bestseller-product />

            <app-week-price-product />

            <app-main-images-product 
                @changeMessage="changeMessage"
            />

            <app-other-field-table />

            <app-other-field-input />

            <app-characteristics-product />

            <app-snackbars 
                :snackbar="snackbar"
                :text="text"
                :colorBckg="colorBckg"
                :colorBtn="colorBtn"
                @changeSnackbar="changeSnackbar"
            />
        </v-container>
    </div>
</template>

<script>
    const AppNameProduct = () => import('~/components/admin/product/main/name-product/index.vue')
    const AppPriceProduct = () => import('~/components/admin/product/main/price-product/index.vue')
    const AppDescrProduct = () => import('~/components/admin/product/main/descr-product/index.vue')
    const AppArticleProduct = () => import('~/components/admin/product/main/article-product/index.vue')
    const AppCategoriesProduct = () => import('~/components/admin/product/main/categories-product/index.vue')
    const AppDiscountProduct = () => import('~/components/admin/product/main/discount-product/index.vue')
    const AppStockProduct = () => import('~/components/admin/product/main/stock-product/index.vue')
    const AppBestsellerProduct = () => import('~/components/admin/product/main/bestseller-product/index.vue')
    const AppWeekPriceProduct = () => import('~/components/admin/product/main/week-price-product/index.vue')
    const AppMainImagesProduct = () => import('~/components/admin/product/main/main-images-product/index.vue')
    const AppOtherFieldTable = () => import('~/components/admin/product/main/other-field-table/index.vue')
    const AppOtherFieldInput = () => import('~/components/admin/product/main/other-field-input/index.vue')
    const AppCharacteristicsProduct = () => import('~/components/admin/product/main/characteristics-product/index.vue')
    const AppSnackbars = () => import('~/components/alerts/snackbar-http/index.vue')

    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Редактирование товара'
        },
        middleware: 'edit',
        async mounted() {
            let vm = this
            this.$nextTick(async function() {
                let id = await vm.$store.getters['modules/product/edit/id']
            
                try {
                    let result = await vm.$axios.$get('/api/product/get-product-id', {params: {id: id}})
                    console.log(result)
                    await vm.$store.dispatch('modules/product/name/set', result.name)
                    await vm.$store.dispatch('modules/product/price/set', result.price)
                    await vm.$store.dispatch('modules/product/descr/set', result.descr)
                    await vm.$store.dispatch('modules/product/article/set', result.article)
                    await vm.$store.dispatch('modules/product/categories/set', result.categories)
                    await vm.$store.dispatch('modules/product/discount/setStatus', result.discountStatus)
                    await vm.$store.dispatch('modules/product/discount/set', result.sizeDiscount)
                    await vm.$store.dispatch('modules/product/stock/set', result.stock)
                    await vm.$store.dispatch('modules/product/bestseller/set', result.bestseller)
                    await vm.$store.dispatch('modules/product/weekPrice/set', result.weekPrice)
                    
                    for(let i = 0; i < result.images.length; i++) {
                        let data = {
                            file: result.images[i].previewImg,
                            previewImg: result.images[i].previewImg
                        }

                        await vm.$store.dispatch('modules/product/images/updateDataImage', {data, index: i})
                    }

                    for(let i = 0; i < result.otherFieldImage.length; i++) {

                        let data = {
                            title: result.otherFieldImage[i].title,
                            info: [
                                {
                                    title: '',
                                    image: {
                                        file: null,
                                        previewImg: null
                                    },
                                    token: `${Math.random()}`
                                }
                            ],
                            token: `${Math.random()}`
                        }
                        
                        await vm.$store.dispatch('modules/product/otherFieldImages/addNewFieldWithImage', data)

                        for(let j = 0; j < result.otherFieldImage[i].info.length; j++) {
                            let dataInfo = {
                                file: result.otherFieldImage[i].info[j].image.previewImg,
                                previewImg: result.otherFieldImage[i].info[j].image.previewImg,
                                token: `${Math.random()}`
                            }
                            await vm.$store.dispatch('modules/product/otherFieldImages/updateOtherFieldImage', 
                            {data: dataInfo, index: j, globalIndex: i})

                            await vm.$store.dispatch('modules/product/otherFieldImages/updateOtherFieldImageTitle',
                            {title: result.otherFieldImage[i].info[j].title, globalIndex: i, index: j})
                        }

                    }
                    
                } catch(e) {
                    console.log(e)
                }
            })
            
        },
        // async validate({ store, redirect, $axios }) {
        //     try {
        //         await $axios.$get('/api/auth/admin/token')
        //         return true
        //     } catch(e) {
        //         redirect('/login?message=login')
        //     }
        // },
        components: {
            AppNameProduct,
            AppPriceProduct,
            AppDescrProduct,
            AppArticleProduct,
            AppCategoriesProduct,
            AppDiscountProduct,
            AppStockProduct,
            AppBestsellerProduct,
            AppWeekPriceProduct,
            AppMainImagesProduct,
            AppOtherFieldTable,
            AppOtherFieldInput,
            AppCharacteristicsProduct,
            AppSnackbars
        },
        data() {
            return {
                message: false,
                snackbar: false,
                text: '',
                colorBckg: '',
                colorBtn: ''
            }
        },
        watch: {
            message(val) {
                if(this.message === 'error type') {
                    this.text = 'Картинка должна быть формата png или jpeg!'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                }
            }
        },
        methods: {
            async changeSnackbar(value) {
                this.snackbar = value
                this.message = false
            },
            async changeMessage(value) {
                this.message = value
            }
        }
    }
</script>

<style lang="sass">
    #products__discount .v-input--selection-controls
        margin-top: 0px
    
</style>