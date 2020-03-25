<template>
        <div class="admin">
            <v-app id="inspire">
                <v-navigation-drawer
                v-model="drawer"
                app
                >
                <v-list dense>
                    <v-list-item nuxt to="/admin/home/">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                    Главная
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item nuxt to="/admin/menu/">
                    <v-list-item-action>
                        <v-icon>mdi-menu-open</v-icon>
                    </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                    Добавление в меню
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item nuxt to="/admin/categories">
                    <v-list-item-action>
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                    Категории товаров
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item nuxt to="/admin/products">
                    <v-list-item-action>
                        <v-icon>mdi-cart</v-icon>
                    </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                    Добавление товара
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item nuxt to="/admin/create-user">
                    <v-list-item-action>
                        <v-icon>mdi-account-plus</v-icon>
                    </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                    Администраторы
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="logOut()">
                    <v-list-item-action>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                    Выйти
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                </v-navigation-drawer>

                <v-app-bar
                app
                color="#0E1D28"
                dark
                >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Панель администратора</v-toolbar-title>
                </v-app-bar>

                <v-content>
                <v-container
                    fluid
                    fill-height
                >
                    <v-layout
                    align-start
                    justify-center
                    >
                    <v-flex text-xs-center>
                        <nuxt />
                    </v-flex>
                    </v-layout>
                </v-container>
                </v-content>
                <v-footer
                color="#0E1D28"
                style="position: relative"
                app
                >
                <span class="white--text">&copy; Developed by Vyacheslav Nosov 2020</span>
                </v-footer>
            </v-app>
        </div>
</template>

<script>
    export default {
        data() {
            return {
                drawer: null
            }
        },
        methods: {
            async logOut() {
                await this.$router.push('/')
				this.$store.dispatch('auth/logout')
            }
        }
    }
</script>

<style lang="sass">
    
    .page-enter-active, .page-leave-active
        transition: opacity .4s
    
    .page-enter, .page-leave-active
        opacity: 0
</style>