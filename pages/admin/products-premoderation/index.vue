<template>
    <div class="premoderation-page">
        <v-container fluid align-center>
            <v-row>
                <v-col >
                    <div class="font-weight-bold title text-center">
                        Премодерация товаров
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <app-view-product 
                    v-for="(item, index) in products"
                    :key="index"
                    :image="item.images[0].previewImg"
                    :categories="item.categories"
                    :title="item.name"
                    :price="item.price"
                    :discountStatus="item.discountStatus"
                    :sizeDiscount="item.sizeDiscount"
                    :id="item._id"
                    :stock="item.stock"
                    :bestseller="item.bestseller"
                    :weekPrice="item.weekPrice"
                    @remove="remove"
                    @removeError="removeError"
                    @publication="publication"
                    @publicationError="publicationError"
                />
            </v-row>
        </v-container>

        <!-- компонент превью продукта
        <app-view-product 
            v-for="(item, index) in premoderationProducts"
            :key="item.name"
            :index="index"
        /> -->

        <app-snackbars 
            :snackbar="snackbar"
            :text="text"
            :colorBckg="colorBckg"
            :colorBtn="colorBtn"
            @changeSnackbar="changeSnackbar"
        />
    </div>
</template>

<script>
    const AppViewProduct = () => import('~/components/admin/product/view-premoderation/index.vue')
    const AppSnackbars = () => import('~/components/alerts/snackbar-http/index.vue')
    const getSnackbarStore = () => import('~/store/modules/alert/snackbar.js')

    export default {
        async mounted() {
            if(!this.$store.getters['modules/alert/snackbar/snackbar']) {
                await this.$store.registerModule('snackbar', getSnackbarStore)
            }
        },
        layout: 'admin',
        async validate({ store, redirect, $axios }) {
            try {
                // проверка на наличие модуля в store
                if(!store.getters['modules/auth/token']) {
                    await store.dispatch('modules/auth/autoLogin')
                }

                // получение токена
                await $axios.$get('/api/auth/admin/token')
                return true
            } catch(e) {
                redirect('/login?message=login')
            }
        },
        head: {
            title: 'Панель администратора | Премодерация товаров'
        },
        data() {
            return {
                products: []
            }
        },
        async asyncData({store, $axios}) {
            const products = await $axios.$get('/api/product/premoderation')
            return {
                products: products.products
            }
        },
        components: {
            AppViewProduct,
            AppSnackbars
        },
        methods: {
            async remove() {
                const products = await this.$axios.$get('/api/product/premoderation')
                this.products = products.products

                await this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                    false)

                this.$store.dispatch('modules/alert/snackbar/setText',
                    'Продукт успешно удален!')
                this.$store.dispatch('modules/alert/snackbar/setColorBtn',
                    'white')
                this.$store.dispatch('modules/alert/snackbar/setColorBckg',
                    'grey darken-4')
                this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                    true)
            },
            async removeError() {

                await this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                    false)

                this.$store.dispatch('modules/alert/snackbar/setText',
                    'При удалении продукта произошла ошибка!')
                this.$store.dispatch('modules/alert/snackbar/setColorBtn',
                    'white')
                this.$store.dispatch('modules/alert/snackbar/setColorBckg',
                    'grey darken-4')
                this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                    true)
            },
            async publication() {
                const products = await this.$axios.$get('/api/product/premoderation')
                this.products = products.products

                await this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                    false)

                this.$store.dispatch('modules/alert/snackbar/setText',
                    'Продукт успешно опубликован!')
                this.$store.dispatch('modules/alert/snackbar/setColorBtn',
                    'white')
                this.$store.dispatch('modules/alert/snackbar/setColorBckg',
                    'grey darken-4')
                this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                    true)
            },
            async publicationError() {

                await this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                    false)

                this.$store.dispatch('modules/alert/snackbar/setText',
                    'При публикации продукта произошла ошибка!')
                this.$store.dispatch('modules/alert/snackbar/setColorBtn',
                    'white')
                this.$store.dispatch('modules/alert/snackbar/setColorBckg',
                    'grey darken-4')
                this.$store.dispatch('modules/alert/snackbar/setSnackbar',
                    true)
            },
            async changeSnackbar(value) {
                this.$store.dispatch('modules/alert/snackbar/setSnackbar', value)
            }
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
        }
    }
</script>

<style lang="sass">

</style>