<template>
        <div class="admin">
            <v-app id="inspire">
                <v-navigation-drawer
                v-model="drawer"
                app
                style="max-height: 100%"
                >
                    <v-list dense>
                        <div id="admin-expansion-panels-on-elem" style="border-bottom: thin solid; border-top: none; border-color: rgba(0, 0, 0, 0.12)">
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
                        </div>
                        <v-expansion-panels accordion id="admin-expansion-panels">
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <v-list-item-action>
                                        <v-icon>mdi-menu</v-icon>
                                    </v-list-item-action>
                                    Меню
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-list-item nuxt to="/admin/menu/">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                    Добавление в меню
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item nuxt to="/admin/menu-edit/">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                    Редактирование меню
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <v-list-item-action>
                                        <v-icon>mdi-format-list-bulleted-square</v-icon>
                                    </v-list-item-action>
                                    Категории
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-list-item nuxt to="/admin/categories/">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                    Добавление категорий
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item nuxt to="/admin/categories-edit/">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                    Редактирование категорий
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <div id="admin-expansion-panels-elem-icon">
                                        <v-list-item nuxt to="/admin/categories-with-image/">
                                            <v-list-item-content>
                                                <v-list-item-title style="align-items: center; display: flex;">
                                                        С картинками
                                                        <v-list-item-action>
                                                            <v-icon class="ml-3">mdi-plus</v-icon>
                                                        </v-list-item-action>
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <v-list-item-action>
                                        <v-icon>mdi-cart-outline</v-icon>
                                    </v-list-item-action>
                                    Товары
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-list-item nuxt to="/admin/products">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                    Добавление товара
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <div id="admin-expansion-panels-on-elem">
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
                        </div>
                        <div id="admin-expansion-panels-on-elem">
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
                        </div>
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

    #inspire
        font-family: "Rubik-Regular", sans-serif

    #inspire .v-content__wrap
        max-width: 1920px
        
    #inspire .v-footer--fixed
        z-index: 7
    
    .page-enter-active, .page-leave-active
        transition: opacity .4s
    
    .page-enter, .page-leave-active
        opacity: 0
    
    #inspire .v-item-group
        border-right: thin solid
        border-color: rgba(0, 0, 0, 0.04)

    #admin-expansion-panels .v-expansion-panel-header
        padding: 0px 16px 0px 24px
    
    #admin-expansion-panels .v-expansion-panel-header > *:not(.v-expansion-panel-header__icon)
        flex: 0 1 auto

    #admin-expansion-panels .v-expansion-panel-content__wrap
        padding: 0px 0px 16px 0px
    
    #admin-expansion-panels .v-list-item 
        padding: 0px 0px 0px 40px
    
    #admin-expansion-panels .v-expansion-panel::before
        box-shadow: none
    
    #admin-expansion-panels-on-elem .v-list-item
        padding: 0px 24px
        
    #admin-expansion-panels-on-elem .v-list-item__title
        font-size: 0.9375rem
    
    #admin-expansion-panels-on-elem
        border-top: thin solid
        border-color: rgba(0, 0, 0, 0.12)
    
    #admin-expansion-panels-elem-icon .v-list-item__action
        margin: 0 
</style>