<template>
    <div>
        <v-container fluid align-center style="max-width: 1920px">
            <v-row>
                <v-col>
                    <div class="font-weight-bold title text-center">
                        Редактирование категории с картинкой
                    </div>
                </v-col>
            </v-row>
            <div class="admin-categories-with-image">
                <app-image 
                    v-for="(item, index) in categories"
                    :key="item.title"
                    :index="index"
                    :title="item.title"
                    :descr="item.descr"
                    :count="item.count"
                    :link="item.link"
                    :img="item.img"
                    :id="item._id"
                />
            </div>
        </v-container>
    </div>
</template>

<script>
    
    const AppImage = () => import('~/components/admin/categories/categories-with-image/index.vue')

    export default {
        head: {
            title: 'Панель администратора | Редактирование категории с картинкой'
        },
        components: {
            AppImage
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
            this.categories =  await this.$axios.$get('/api/categories-with-image')
        },
        layout: 'admin',
        data() {
            return {
                categories: []
            }
        }
    }
</script>

<style lang="sass"> 
    .admin-categories-with-image
        display: flex
        flex-wrap: wrap
        +size(7)
        +ms-block
            flex-direction: column
        +size-xs(12)
        justify-content: space-between
        margin: 0 auto
</style>