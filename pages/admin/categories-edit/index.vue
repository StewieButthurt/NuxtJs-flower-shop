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

    export default {
        head: {
            title: 'Панель администратора | Редактирование категорий'
        },
        async validate({ store, redirect, $axios }) {
            try {
                await $axios.$get('/api/auth/admin/token')
                return true
            } catch(e) {
                redirect('/login?message=login')
            }
        },
        layout: 'admin',
        computed: {
            categories() {
                return this.$store.getters['layouts-links/categories']
            }
        },
        methods: {
            async selectItem(item) {
                let data = {
                    title: item.title,
                    id: item._id
                }

                await this.$store.dispatch('localStorage/setCategories', data)

                this.$router.push(`/admin/categories-edit/edit`)
            }
        },
        async fetch ({ store, $axios}) {

            let categories = await $axios.$get('/api/categories')
            store.commit('layouts-links/setCategories', categories)
            
        }
    }
</script>

<style lang="sass">

</style>