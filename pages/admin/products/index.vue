!<template>
    <div class="admin-products">
        <v-container fluid>
            <v-row>
                <v-col>
                    <div class="font-weight-bold title">
                        Обязательные поля
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field 
                    prepend-inner-icon="mdi-format-title"
                    label="Название товара"
                    v-model="params.title"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field 
                    prepend-inner-icon="mdi-currency-rub"
                    label="Цена товара (Пример: 2000)"
                    v-model="params.price"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-textarea
                        name="input-7-1"
                        :auto-grow="true"
                        :dense="true"
                        prepend-inner-icon="mdi-grease-pencil"
                        label="Описание товара"
                        value=""
                        v-model="params.descr"
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field 
                    prepend-inner-icon="mdi-file-document"
                    label="Артикул (Например: 7623BJ7)"
                    v-model="params.article"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div class="font-weight-bold title">
                        Характеристики товара
                    </div>
                    <div class="font-weight-medium subtitle-1 mt-2 font-italic">
                        Пример:
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div class="admin-products__list-wrapper">
                        <div class="admin-products__list-col-1 admin-products__list font-weight-bold subtitle-1">
                            <span class="mr-4">Высота</span>
                        </div>
                        <div class="admin-products__list font-weight-medium subtitle-1">
                            <span>13\50 см</span>
                        </div>
                    </div>
                    <div class="admin-products__list-wrapper">
                        <div class="admin-products__list-col-1 admin-products__list admin-products__list_grey font-weight-bold subtitle-1">
                            <span class="mr-4">Освещение</span>
                        </div>
                        <div class="admin-products__list admin-products__list_grey font-weight-medium subtitle-1">
                            <span>Любит яркий рассеянный свет</span>
                        </div>
                    </div>
                    <div class="admin-products__list-wrapper">
                        <div class="admin-products__list-col-1 admin-products__list font-weight-bold subtitle-1">
                            <span class="mr-4">Влажность воздуха</span>
                        </div>
                        <div class="admin-products__list font-weight-medium subtitle-1">
                            <span>60%</span>
                        </div>
                    </div>
                    <div class="admin-products__list-wrapper">
                        <div class="admin-products__list-col-1 admin-products__list admin-products__list_grey font-weight-bold subtitle-1">
                            <span class="mr-4">Температура</span>
                        </div>
                        <div class="admin-products__list admin-products__list_grey font-weight-medium subtitle-1">
                            <span>22-26°C</span>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <!-- <app-product-characteristics 
                    v-for="item in params.other"
                    :key="item.title"
                    :title="item.title"
                    :descr="item.descr"
                /> -->
            </v-row>
            <v-row>
                <v-btn class="mx-2 mt-5" fab dark color="indigo">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    const AppProductCharacteristics = () => {import('~/components/admin/product-characteristics')}
    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Добавление товара'
        },
        components: {
            AppProductCharacteristics
        },
        data() {
            return {
                params: {
                    title: '',
                    price: '',
                    descr: '',
                    article: '',
                    other: []
                }
            }
        }
    }
</script>

<style lang="sass">
    .admin-products__list-wrapper
        display: flex
        min-height: 40px
        max-width: 510px

    .admin-products__list
        width: 100%
        display: flex
        align-items: center
    
    .admin-products__list-col-1
        min-width: 150px
        padding: 0px
        padding-left: 12px
    
    .admin-products__list-col-2
        flex-grow: 1
    
    .admin-products__list_grey
        background-color: #e8e8e8
</style>