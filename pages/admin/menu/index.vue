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
            <v-row align="center" justify="center" id="admin-add-menu__switcher">
                <v-col cols="12" sm="9" md="7" align="center" justify="center" style="max-width: 700px" >
                    <v-switch
                        v-model="toEnd"
                        class="mr-5"
                        label="Добавить в конец меню"
                    ></v-switch>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7">
                    <v-text-field 
                        :disabled="toEnd"
                        prepend-inner-icon="mdi-counter"
                        label="Добавить пункт под номером"
                        v-model="numberLink"
                        @blur="changeNumberLink()"
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
        </v-container>
    </div>
</template>

<script>
    export default {
        head: {
            title: 'Панель администратора | Добавление в меню'
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
                toEnd: true,
                numberLink: 1,
                loading: false,
                message: false
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
            },
            checkNumberLink() {
                if(!this.toEnd) {
                    return this.numberLink
                } else {
                    return false
                }
            }
        },
        methods: {
            async changeNumberLink() {
                this.numberLink = Number(this.numberLink)
                if(this.numberLink || 
                    this.numberLink > 1 
                    ) {
                    return this.numberLink 
                } else {
                    return this.numberLink = 1
                }
            },
            async sendForm() {

                if(this.checkFields) {

                    this.loading = true
                    let vm = this
                    const formData = {
                        title: this.title,
                        link: this.link,
                        count: this.checkNumberLink ? this.checkNumberLink : false,
                        status: false
                    }

                    await this.$axios.$post('/api/menu/create', formData)
                        .then(function (response) {
                                vm.message = response.message
                                vm.title = ''
                                vm.link = ''
                                vm.numberLink = 1
                                vm.loading = false
                        })
                        .catch(function (error) {
                            // handle error
                            vm.message = 'error'
                            vm.title = ''
                            vm.link = ''
                            vm.numberLink = 1
                            vm.loading = false
                            console.log(error);
                        })
                }
            }
        }
    }
</script>

<style lang="sass">
    #admin-add-menu__switcher .v-input--selection-controls
        margin-top: 0px
</style>