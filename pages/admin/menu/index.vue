<template>
    <div class="admin-add-menu">
        <v-container fluid align-center>
            <v-row>
                <v-col>
                    <div class="font-weight-bold title text-center">
                        Добавление нового пункта в меню
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7">
                    <v-text-field
                    style="max-width: 700px" 
                    prepend-inner-icon="mdi-format-title"
                    label="Название пункта меню"
                    v-model="title"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7">
                    <v-text-field
                    style="max-width: 700px" 
                    prepend-inner-icon="mdi-link"
                    label="Ссылка"
                    v-model="link"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
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
            title: 'Панель администратора | Добавление в меню'
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
        layout: 'admin',
        data() {
            return {
                title: '',
                link: '',
                loading: false,
                message: false,
                text: '',
                colorBtn: '',
                colorBckg: '',
                snackbar: false
            }
        },
        watch: {
            message(val) {
                if(val === 'success') {
                    this.text = 'Добавлен новый пункт меню'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                } else if(val === 'error'){
                    this.text = 'Упс! Что то пошло не так!'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                }
            }
        },
        computed: {
            checkFields() {
                if( this.title !== '' &&
                    this.link !== '' 
                ) 
                {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            async sendForm() {
                this.message = false
                if(this.checkFields) {

                    this.loading = true
                    let vm = this
                    const formData = {
                        title: this.title,
                        link: this.link,
                        status: false
                    }

                    await this.$axios.$post('/api/menu/create', formData)
                        .then(function (response) {
                                vm.message = response.message
                                vm.title = ''
                                vm.link = ''
                                vm.loading = false
                        })
                        .catch(function (error) {
                            // handle error
                            vm.message = 'error'
                            vm.title = ''
                            vm.link = ''
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
    #admin-add-menu__switcher .v-input--selection-controls
        margin-top: 0px
</style>