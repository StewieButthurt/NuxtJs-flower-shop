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
                <v-col>
                    <app-view-product />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    const AppViewProduct = () => import('~/components/admin/product/view/index.vue')

    export default {
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
        async fetch({store, $axios}) {
            const products = await $axios.$get('/api/product/premoderation')
        },
        components: {
            AppViewProduct
        }
    }
</script>

<style lang="sass">

</style>