<template>
    <div class="admin-edit-menu">
        <v-container fluid align-center>
            <v-row>
                <v-col>
                    <v-card
                        class="mx-auto"
                        max-width="300"
                        tile
                        >
                            <v-list>
                                <v-subheader>Выберете категорию для изменения</v-subheader>
                                <v-list-item-group color="primary">
                                    <v-list-item
                                        v-for="(item, i) in categories"
                                        :key="i"
                                        @click="selectItem(item)"
                                    >
                                        <v-list-item-icon>
                                        <v-icon>mdi-pencil</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    const getCategoriesStore = () => import('~/store/modules/product/categories.js')
    export default {
        head: {
            title: 'Панель администратора | Редактирование категорий'
        },
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
        async mounted() {
            if(!this.$store.getters['modules/product/categories/categories']) {
                await this.$store.registerModule('categories', getCategoriesStore)
            }
        },
        layout: 'admin',
        computed: {
            categories() {
                return this.$store.getters['modules/product/categories/categories']
            }
        },
        methods: {
            async selectItem(item) {
                let data = {
                    title: item.title,
                    id: item._id
                }

                await this.$store.dispatch('modules/product/categories/set', data)

                this.$router.push(`/admin/categories-edit/edit`)
            }
        },
        async fetch ({ store, $axios}) {

            let categories = await $axios.$get('/api/categories')
            store.commit('modules/product/categories/set', categories)
            
        }
    }
</script>

<style lang="sass">

</style>