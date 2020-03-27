<template>
    <div class="admin-edit-on-menu">
        <v-container fluid align-center>
            <v-row>
                <v-col>
                    <div class="font-weight-bold title text-center">
                        Редактирование пункта меню
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
                <v-col cols="12" sm="9" md="7">
                    <v-text-field
                    style="max-width: 700px" 
                    prepend-inner-icon="mdi-link"
                    label="Ссылка"
                    v-model="localLink"
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
            title: 'Панель администратора | Редактирование меню'
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

            let menu = await $axios.$get('/api/menu')
            store.commit('layouts-links/setMainLinks', menu)
            
        },
        layout: 'admin',
        async mounted() {
            this.localTitle = this.title
            this.localLink = this.link
        },
        data() {
            return {
                localTitle: '',
                localLink: '',
                loading: false,
                message: false,
                text: '',
                colorBtn: '',
                colorBckg: '',
                snackbar: false
            }
        },
        computed: {
            menu() {
                return this.$store.getters['localStorage/menu']
            },
            title() {
                return this.menu.title
            },
            link() {
                return this.menu.link
            },
            checkFields() {
                if( this.localTitle !== '' &&
                    this.localLink !== '' 
                ) 
                {
                    return true
                } else {
                    return false
                }
            }
        },
        watch: {
            message(val) {
                if(val === 'success') {
                    this.text = 'Пункт изменен'
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
            },
            link(val) {
                this.localLink = val
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
                        link: this.localLink,
                        id: this.menu.id,
                        status: false
                    }

                    await this.$axios.$post('/api/menu/edit', formData)
                        .then(async function (response) {
                                vm.message = response.message
                                vm.loading = false

                                await vm.$store.dispatch('localStorage/setMenu', formData)
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