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

            <app-characteristics-product 
                :urlStore="`/admin/products-edit/edit/preview`"
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
    const getSnackbarStore = () => import('~/store/modules/alert/snackbar.js')

    export default {
        async mounted() {
            if(!this.$store.getters['modules/alert/snackbar/snackbar']) {
                await this.$store.registerModule('snackbar', getSnackbarStore)
            }
        },
        layout: 'admin',
        head: {
            title: 'Панель администратора | Редактирование товара'
        },
        middleware: ['checkProductEdit'],
        async validate({ store, redirect, $axios }) {
            try {
                
                if(!store.getters['modules/auth/token']) {
                    await store.dispatch('modules/auth/autoLogin')
                }

                await $axios.$get('/api/auth/admin/token')
                return true
            } catch(e) {
                redirect('/login?message=login')
            }
        },
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
        computed: {
            message() {
                return this.$store.getters['modules/alert/snackbar/message']
            },
            snackbar() {
                return this.$store.getters['modules/alert/snackbar/snackbar']
            },
            text() {
                return this.$store.getters['modules/alert/snackbar/text']
            },
            colorBckg() {
                return this.$store.getters['modules/alert/snackbar/colorBckg']
            },
            colorBtn() {
                return this.$store.getters['modules/alert/snackbar/colorBtn']
            }
        },
        watch: {
            message(val) {
                if(this.message === 'error type') {
                    this.$store.dispatch('modules/alert/snackbar/setText', 'Картинка должна быть формата png или jpeg!')
                    this.$store.dispatch('modules/alert/snackbar/setColorBtn', 'white')
                    this.$store.dispatch('modules/alert/snackbar/setColorBckg', 'grey darken-4')
                    this.$store.dispatch('modules/alert/snackbar/setSnackbar', true)
                }
            }
        },
        methods: {
            async changeSnackbar(value) {
                this.$store.dispatch('modules/alert/snackbar/setSnackbar', value)
                this.$store.dispatch('modules/alert/snackbar/setMessage', false)
            },
            async changeMessage(value) {
                this.$store.dispatch('modules/alert/snackbar/setMessage', value)
            }
        }
    }
</script>

<style lang="sass">
    #products__discount .v-input--selection-controls
        margin-top: 0px
    
</style>