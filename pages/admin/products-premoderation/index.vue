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
            <v-row class="justify-space-around">
                <app-view-product 
                    v-for="(item, index) in products"
                    :key="index"
                    :product="item"
                />
            </v-row>
        </v-container>
    </div>
</template>

<script>
    const AppViewProduct = () => import('~/components/admin/product/view/index.vue')

    export default {
        async mounted() {
            console.log(this.products)
        },
        layout: 'admin',
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
            AppViewProduct
        }
    }
</script>

<style lang="sass">

</style>