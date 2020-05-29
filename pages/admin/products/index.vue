!<template>
    <div class="edit">
        <v-container fluid align-center>
            <v-row>
                <v-col >
                    <div class="font-weight-bold title text-center">
                        Обязательные поля
                    </div>
                </v-col>
            </v-row>

            <app-name-product 
                :storeUrl="`modules/product/name/`"
            />

            <app-price-product 
                :storeUrl="`modules/product/price/`"
            />

            <app-descr-product 
                :storeUrl="`modules/product/descr/`"
            />
            
            <app-article-product 
                :storeUrl="`modules/product/article/`"
            />

            <app-categories-product 
                :storeUrl="`modules/product/categories/`"
            />

            <app-discount-product 
                :storeUrl="`modules/product/discount/`"
            />

            <app-stock-product 
                :storeUrl="`modules/product/stock/`"
            />

            <app-bestseller-product 
                :storeUrl="`modules/product/bestseller/`"
            />

            <app-week-price-product 
                :storeUrl="`modules/product/weekPrice/`"
            />

            <app-main-images-product 
                :storeUrl="`modules/product/images/`"
                @changeMessage="changeMessage"
            />

            <app-other-field-table 
                :storeUrl="`modules/product/otherFieldImages/`"
            />

            <app-other-field-input 
                :storeUrl="`modules/product/newFields/`"
            />

            <app-characteristics-product 
                :storeUrl="storeUrl"
            />

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
            title: 'Панель администратора | Добавление товара'
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
                colorBtn: '',
                storeUrl: 'product/add/',
                localNewFields: [],
                chips: []
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
        computed: {
            images() {
                return this.$store.getters[`${this.storeUrl}images`]
            }
        },
        methods: {
            async setImageField(data) {
                await this.$store.dispatch(`${this.storeUrl}setImageField`, data)
            },
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