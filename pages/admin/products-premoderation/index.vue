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
        </v-container>

        <!-- компонент превью продукта -->
        <app-view-product 
            v-for="(item, index) in premoderationProducts"
            :key="item.name"
            :index="index"
        />
    </div>
</template>

<script>
    const AppViewProduct = () => import('~/components/admin/product/view/index.vue')
    export default {
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
        components: {
            AppViewProduct
        },
        data() {
            return {
                premoderationProducts: []
            }
        },
        computed: {
            products() {
                // return this.$store.getters['modules/']
            }
        }
    }
</script>

<style lang="sass">

</style>