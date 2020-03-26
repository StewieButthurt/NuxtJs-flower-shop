<template>
    <div class="create-user">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
        >
          <v-col
            cols="12"
            sm="5"
            md="5"
          >
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Логин"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    autocomplete="new-password"
                    v-model="login"
                    :error-messages="loginErrorDescr"
                    :error="loginError"
                    @input="inputLogin"
                  />

                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    autocomplete="new-password"
                    v-model="password"
                    :error-messages="passwordErrorDescr"
                    :error="passwordError"
                    @input="inputPassword"
                  />

                  <v-text-field
                    id="password2"
                    label="Повторите пароль"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    autocomplete="new-password2"
                    v-model="password2"
                    :error-messages="passwordErrorDescr"
                    :error="passwordError"
                    @input="inputPassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn :disabled="!(login !== '' && checkPassword === true)" 
                       :loading="loading" 
                       color="primary" 
                       class="login__button"
                       @click="createUser()"
                       >
                       Добавить
                </v-btn>
              </v-card-actions>
          </v-col>
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
    import isEmpty from 'validator/lib/isEmpty'
	  import isAlphanumeric from 'validator/lib/isAlphanumeric'
    import isByteLength from 'validator/lib/isByteLength'

    const AppSnackbars = () => import('~/components/alerts/snackbar-http/index.vue')


    export default {
        head: {
            title: 'Панель администратора | Администраторы'
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
        components: {
          AppSnackbars
        },
        data() {
            return {
                login: '',
                loginError: false,
                loginErrorDescr: '',
                passwordError: false,
                passwordErrorDescr: '',
                loginAccessValues: {min: 3, max: 16},
                passwordAccessValues: {min: 3, max: 24},
                loginValidate: false,
                passwordValidate: false,
                password: '',
                password2: '',
                loading: false,
                message: false,
                text: '',
                colorBtn: '',
                colorBckg: '',
                snackbar: false
            }
        },
        computed: {
            checkPassword() {
                if(this.password !== '' && 
                  this.password2 !== '' && 
                  this.password === this.password2
                  ) {
                      return true
                  } else {
                      return false
                  }
            }
        },
        watch: {
            message(val) {
                if(val === 'success') {
                    this.text = 'Новый пользователь добавлен'
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
        methods: {
            async createUser() {
                this.message = false

                if(this.passwordValidate === true && this.loginValidate === true) {
                    let vm = this
                    this.loading = true

                    const formData = {
                        login: this.login,
                        password: this.password
                    }
                    
                    await this.$axios.$post('/api/auth/admin/create', formData)
                      .then( function(response) {
                          vm.message = response.message
                          vm.login = ''
                          vm.password = ''
                          vm.password2 = ''
                          vm.loading = false
                      })
                      .catch(function (error) {
                            // handle error
                            vm.message = 'error'
                            vm.login = ''
                            vm.password = ''
                            vm.password2 = ''
                            vm.loading = false
                            console.log(error);
                        })
                    
                }
            },
            async inputLogin() {
              if(!isEmpty(this.login)) {
                this.loginError = null
                this.loginErrorDescr = ''
                if(isAlphanumeric(this.login)) {
                  this.loginError = null
                  this.loginErrorDescr = ''
                  if(isByteLength(this.login, this.loginAccessValues)) {
                    this.loginError = false
                    this.loginErrorDescr = ''
                    this.loginValidate = true
                  } else {
                    this.loginErrorDescr = '* Username must be at least 3 characters and no more than 16'
                    this.loginError = true
                    this.loginValidate = false
                  }
                } else {
                  this.loginErrorDescr = '* Login must contain only letters and digits in the Latin alphabet'
                  this.loginError = true
                  this.loginValidate = false
                }
              } else {
                this.loginErrorDescr = '* Enter the username'
                this.loginError = true
                this.loginValidate = false
              }
            },
            async inputPassword() {
              if(!isEmpty(this.password)) {
                this.passwordError = null
                this.passwordErrorDescr = ''
                if(isAlphanumeric(this.password)) {
                  this.passwordError = null
                  this.passwordErrorDescr = ''
                  if(isByteLength(this.password, this.passwordAccessValues)) {
                    this.passwordError = false
                    this.passwordErrorDescr = ''
                    this.passwordValidate = true
                  } else {
                    this.passwordErrorDescr = '* The password must be at least 3 characters and no more than 24'
                    this.passwordError = true
                    this.passwordValidate = false
                  }
                } else {
                  this.passwordErrorDescr = '* The password must contain only letters and digits in the Latin alphabet'
                  this.passwordError = true
                  this.passwordValidate = false
                }
              } else {
                this.passwordErrorDescr = '* Enter the password'
                this.passwordError = true
                this.passwordValidate = false
              }
            },
            async changeSnackbar(value) {
                this.snackbar = value
            }
        }
    }
</script>

<style lang="sass">
    .login__button
        border-radius: 0px
        background-color: #1B7DFF
</style>