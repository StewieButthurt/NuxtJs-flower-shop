!<template>
    <div class="admin-categories">
        <v-container
            class="fill-height"
            fluid
        >
            <v-row>
                <v-col>
                    <div class="font-weight-bold title text-center">
                        Добавление новой категории
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7">
                    <v-text-field
                    style="max-width: 700px" 
                    prepend-inner-icon="mdi-format-title"
                    label="Название категории"
                    v-model="title"
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
        layout: 'admin',
        head: {
            title: 'Панель администратора | Категории товаров'
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
        data() {
            return {
                title: '',
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
                    this.text = 'Добавлена новая категория!'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                } else if( val === 'busy') {
                    this.text = 'Такая категория уже существует'
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
                if( this.title !== '' ) {
                    return true
                } else {
                    return false
                }
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
                        title: this.title,
                        status: false
                    }

                    await this.$axios.$post('/api/categories/create', formData)
                        .then(function (response) {
                                vm.message = response.message
                                vm.title = ''
                                vm.loading = false
                        })
                        .catch(function (error) {
                            // handle error
                            vm.message = 'error'
                            vm.title = ''
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