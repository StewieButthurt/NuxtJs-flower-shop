!<template>
    <div class="admin-products">
        <v-container fluid align-center>
            <v-row>
                <v-col>
                    <div class="font-weight-bold title text-center">
                        Обязательные поля
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="6" md="6">
                    <v-text-field 
                    prepend-inner-icon="mdi-format-title"
                    label="Название товара"
                    v-model="localTitle"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="6" md="6">
                    <v-text-field 
                    prepend-inner-icon="mdi-currency-rub"
                    label="Цена товара (Пример: 2000)"
                    v-model="localPrice"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="6" md="6">
                    <v-textarea
                        name="input-7-1"
                        :auto-grow="true"
                        :dense="true"
                        prepend-inner-icon="mdi-grease-pencil"
                        label="Описание товара"
                        value=""
                        v-model="localDescr"
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="6" md="6">
                    <v-text-field 
                    prepend-inner-icon="mdi-file-document"
                    label="Артикул (Например: 7623BJ7)"
                    v-model="localArticle"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                    <div class="font-weight-bold title">
                        Характеристики товара
                    </div>
                    <div class="font-weight-medium subtitle-1 mt-2 font-italic">
                        Пример:
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col align="center" justify="center">
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
            <v-row v-if="other.length !== 0" align="center" justify="center">
                <v-col align="center" justify="center">
                    <app-product-characteristics 
                        v-for="(item, index) in other"
                        :key="index"
                        :titleLocal="item.title"
                        :descrLocal="item.descr"
                        :index="index"
                    />
                </v-col>
            </v-row>
            <v-row class="align-center" align="center" justify="center">
                <v-btn class="mx-2 mt-5" fab color="indigo" @click="addField()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn class="mx-2 mt-5" color="teal" :disabled="checkFields">
                    <v-icon class="mr-2">mdi-content-save</v-icon>
                    Сохранить
                </v-btn>
                <v-btn class="mx-2 mt-5" color="error" @click="clearFields()">
                    <v-icon class="mr-2">mdi-delete-forever</v-icon>
                    Очистить поля
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    const AppProductCharacteristics = () => import('~/components/admin/product-characteristics/index.vue')
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
                localTitle: '',
                localPrice: '',
                localDescr: '',
                localArticle: ''
                
            }
        },
        mounted() {
            this.localTitle = this.title,
            this.localPrice = this.price,
            this.localDescr = this.descr,
            this.localArticle = this.article
        },
        computed: {
            other() {
                return this.$store.getters['localStorage/other']
            },
            title() {
                return this.$store.getters['localStorage/title']
            },
            price() {
                return this.$store.getters['localStorage/price']
            },
            descr() {
                return this.$store.getters['localStorage/descr']
            },
            article() {
                return this.$store.getters['localStorage/article']
            },
            checkFields() {
                if( this.localTitle !== '' &&
                    this.localPrice !== '' &&
                    this.localDescr !== '' &&
                    this.localArticle !== ''
                ) 
                {
                    return false
                } else {
                    return true
                }
            }

        },
        methods: {
            async addField() {
                let data = {
                    title: '',
                    descr: ''
                }

                this.$store.dispatch('localStorage/setField', data)
            },
            async clearFields() {
                this.localTitle = '',
                this.localPrice = '',
                this.localDescr = '',
                this.localArticle = '',
                this.$store.dispatch('localStorage/clearFields')
            }
        },
        watch: {
            localTitle(val) {
                this.$store.dispatch('localStorage/setTitle', val)
            },
            localPrice(val) {
                this.$store.dispatch('localStorage/setPrice', val)
            },
            localDescr(val) {
                this.$store.dispatch('localStorage/setDescr', val)
            },
            localArticle(val) {
                this.$store.dispatch('localStorage/setArticle', val)
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