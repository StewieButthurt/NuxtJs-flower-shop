<template>
    <div class="login">
         <v-app id="inspire">
    <v-content >
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
          class="mx-auto"
        >
          <v-col
            cols="12"
            xl="3"
            lg="4"
            md="5"
            sm="6"
            xs="6"

          >
            <v-row justify="center" align="center">
              <v-col  
              >
                <v-fade-transition>
                  <v-alert class="my-v-alert text-center" 
                        :dense="true" 
                        type="info" 
                        v-if="messageInfo"
                        transition="scale-transition"
                        >
                  {{messageInfo}}
                  </v-alert>
                </v-fade-transition>
                <v-fade-transition>
                  <v-alert class="my-v-alert text-center" 
                        :dense="true" 
                        type="warning" 
                        v-if="messageSession"
                        transition="scale-transition"
                        >
                        {{messageSession}}
                  </v-alert>
                </v-fade-transition>
                <v-fade-transition>
                  <v-alert class="my-v-alert text-center" 
                        :dense="true" 
                        type="error" 
                        v-if="messageAuthError"
                        transition="scale-transition"
                        >
                      {{messageAuthError}}
                  </v-alert>
                </v-fade-transition>
                <v-fade-transition>
                  <v-alert class="my-v-alert text-center" 
                        :dense="true" 
                        type="error" 
                        v-if="messageLoginAttempts"
                        transition="scale-transition"
                        >
                  {{messageLoginAttempts}}
                  </v-alert>
                </v-fade-transition>
              </v-col>
            </v-row>
            <v-card class="elevation-12">
              <v-toolbar
                color="#0E1D28"
                dark
                flat
              >
                <v-toolbar-title>Authorization</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    autocomplete="new-password"
                    v-model="login"
                    :error-messages="loginErrorDescr"
                    :error="loginError"
                    @input="inputLogin"
                    v-on:keyup.enter="loginAuth"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    autocomplete="new-password"
                    v-model="password"
                    :error-messages="passwordErrorDescr"
                    :error="passwordError"
                    @input="inputPassword"
                    v-on:keyup.enter="loginAuth"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn :disabled="!(disabledButtonLogin === true && disabledButtonPassword === true)" 
                       :loading="loading" 
                       color="primary" 
                       class="login__button"
                       @click="loginAuth()"
                       >
                       Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
    </div>
</template>

<script>

    import isEmpty from 'validator/lib/isEmpty'
	  import isAlphanumeric from 'validator/lib/isAlphanumeric'
    import isByteLength from 'validator/lib/isByteLength'
    
    export default {
        layout: 'login',
        data() {
            return {
                login: '',
                loginError: false,
                loginErrorDescr: '',
                password: '',
                passwordError: false,
                passwordErrorDescr: '',
                loginAccessValues: {min: 3, max: 16},
                passwordAccessValues: {min: 3, max: 24},
                loginValidate: false,
                passwordValidate: false,
                loading: false
            }
        },
        computed: {
            disabledButtonLogin() {
                if(this.login !== '' && this.loginValidate === true) {
                    return true
                } else {
                    return false
                }
            },
            disabledButtonPassword() {
                if(this.password !== '' && this.passwordValidate === true) {
                    return true
                } else {
                    return false
                }
            },
            message() {
              return this.$route.query
            },
            messageInfo() {
              if(this.message.message === 'login') {
                return 'Log in to get started'
              } else {
                return false
              }
            },
            messageSession() {
              if(this.message.message === 'session') {
                return 'Session timed out, login again'
              } else {
                return false
              }
            },
            messageAuthError() {
              if(this.message.message === 'errorAuth') {
                return 'The data you entered is not correct'
              } else {
                return false
              }
            },
            messageLoginAttempts() {
              if(this.message.message === 'loginAttempts') {
                return 'Too many authorization attempts, try again in an 5 min'
              } else {
                return false
              }
            }

        },
        methods: {
            inputLogin() {
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
            inputPassword() {
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
            async loginAuth() {
              if(this.disabledButtonLogin && this.disabledButtonPassword) {
                this.loading = true
                try {
                  const formData = {
                    login: this.login,
                    password: this.password
                  }
                  this.$router.push('/login')
                  await this.$store.dispatch('auth/login', formData)
                  this.loading = false
                  this.$router.push('/admin/home/')
                } catch (e) {
                    this.loading = false
                  }
              }
            }
      }
    }
</script>

<style lang="sass">

    .login__button
        border-radius: 0px
        background-color: #1B7DFF

    .my-v-alert 
      margin-bottom: 0px

    .my-v-alert .v-alert__wrapper
      justify-content: center
      align-items: center

    .my-v-alert .v-alert__content
      display: block
      flex: none
      width: 80%
    

</style>