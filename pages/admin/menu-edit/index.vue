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
                                <v-subheader>Выберете пункт для редактирования</v-subheader>
                                <v-list-item-group color="primary">
                                    <v-list-item
                                        v-for="(item, i) in mainLinks"
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
            title: 'Панель администратора | Редактирование меню'
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
        layout: 'admin',
        computed: {
            mainLinks() {
                return this.$store.getters['layouts-links/mainLinks']
            }
        },
        methods: {
            async selectItem(item) {
                let data = {
                    title: item.title,
                    link: item.link,
                    id: item._id
                }

                await this.$store.dispatch('localStorage/setMenu', data)

                this.$router.push(`/admin/menu-edit/edit`)
            }
        },
        async fetch ({ store, $axios}) {

            let menu = await $axios.$get('/api/menu')
            store.commit('layouts-links/setMainLinks', menu)
            
        }
    }
</script>

<style lang="sass">

</style>