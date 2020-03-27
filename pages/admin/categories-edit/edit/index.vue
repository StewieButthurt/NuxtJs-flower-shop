<template>
    <div class="admin-edit-on-categories">
        <v-container fluid align-center>
            <v-row>
                <v-col>
                    <div class="font-weight-bold title text-center">
                        Редактирование категорий
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7">
                    <v-text-field
                    style="max-width: 700px" 
                    prepend-inner-icon="mdi-format-title"
                    label="Название пункта меню"
                    v-model="localTitle"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-btn class="mx-2 mt-5" 
                    dark
                    @click="$router.back()"
                    >
                    <v-icon dark left>mdi-arrow-left</v-icon>
                    Назад
                </v-btn>
                <v-btn 
                    @click="sendForm()" 
                    class="mx-2 mt-5" 
                    color="teal" 
                    :disabled="!checkFields"
                    :loading="loading" 
                    >
                        <v-icon class="mr-2">mdi-content-save</v-icon>
                    Сохранить
                </v-btn>
            </v-row>
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

    const AppSnackbars = () => import('~/components/alerts/snackbar-http/index.vue')


    export default {
        head: {
            title: 'Панель администратора | Редактирование категорий'
        },
        components: {
            AppSnackbars
        },
        async validate({ store, redirect, $axios }) {
            try {
                await $axios.$get('/api/auth/admin/token')
                return true
            } catch(e) {
                redirect('/login?message=login')
            }
        },
        async fetch ({ store, $axios}) {

            let categories = await $axios.$get('/api/categories')
            store.commit('layouts-links/setCategories', categories)
            
        },
        layout: 'admin',
        async mounted() {
            this.localTitle = this.title
        },
        data() {
            return {
                localTitle: '',
                loading: false,
                message: false,
                text: '',
                colorBtn: '',
                colorBckg: '',
                snackbar: false
            }
        },
        computed: {
            categories() {
                return this.$store.getters['localStorage/categories']
            },
            title() {
                return this.categories.title
            },
            checkFields() {
                if( this.localTitle !== '') {
                    return true
                } else {
                    return false
                }
            }
        },
        watch: {
            message(val) {
                if(val === 'success') {
                    this.text = 'Категория изменена'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                } else if(val === 'error'){
                    this.text = 'Упс! Что то пошло не так!'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                }
            },
            title(val) {
                this.localTitle = val
            }
        },
        methods: {
            async sendForm() {
                this.message = false
                this.snackbar = false
                if(this.checkFields) {

                    this.loading = true
                    let vm = this
                    const formData = {
                        title: this.localTitle,
                        id: this.categories.id,
                        status: false
                    }

                    await this.$axios.$post('/api/categories/edit', formData)
                        .then(async function (response) {
                                vm.message = response.message
                                vm.loading = false

                                await vm.$store.dispatch('localStorage/setCategories', formData)
                        })
                        .catch(function (error) {
                            // handle error
                            vm.message = 'error'
                            vm.loading = false
                            console.log(error);
                        })
                }
            },
            async changeSnackbar(value) {
                this.snackbar = value
            }
        }
    }
</script>

<style lang="sass">

</style>