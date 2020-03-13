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
                <v-col cols="12" sm="9" md="7">
                    <v-text-field
                    style="max-width: 700px" 
                    prepend-inner-icon="mdi-format-title"
                    label="Название товара"
                    v-model="localTitle"
                    @blur="updateTitle(localTitle)"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7">
                    <v-text-field
                    style="max-width: 700px"  
                    prepend-inner-icon="mdi-currency-rub"
                    label="Цена товара (Пример: 2000)"
                    v-model="localPrice"
                    type="number"
                    @blur="updatePrice()"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7">
                    <v-textarea
                        name="input-7-1"
                        style="max-width: 700px" 
                        :auto-grow="true"
                        :dense="true"
                        prepend-inner-icon="mdi-grease-pencil"
                        label="Описание товара"
                        value=""
                        v-model="localDescr"
                        @blur="updateDescr(localDescr)"
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7">
                    <v-text-field 
                    style="max-width: 700px" 
                    prepend-inner-icon="mdi-file-document"
                    label="Артикул (Например: 7623BJ7)"
                    v-model="localArticle"
                    @blur="updateArticle(localArticle)"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7" align="center" justify="center" style="max-width: 700px" >
                        <v-text-field 
                            :disabled="!localDiscountStatus"
                            prepend-inner-icon="mdi-percent"
                            label="Скидка % (Например: 10)"
                            v-model="localDiscount"
                            @blur="updateDiscount()"
                        ></v-text-field>
                        <v-switch
                            v-model="localDiscountStatus"
                            class="mt-5 mr-5"
                            label="Скидка"
                        ></v-switch>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col align="center" justify="center" cols="12" sm="9" md="7" >
                        <app-product-add-image 
                            v-for="(item, index) in images"
                            :key="index"
                            :previewImageLocal="item.previewImg"
                            :fileLocal="item.file"
                            :index="index"
                        />
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                    <v-row align="center" justify="center" class="font-weight-bold title">
                        Дополнительные поля
                    </v-row>
                    <v-row align="center" justify="center" class="font-weight-medium subtitle-1 mt-2 font-italic">
                        Пример:
                    </v-row>
                    <client-only>
                        <v-row align="center" justify="center" id="products__example-select">
                            <v-col align="center" justify="center" cols="12" sm="9" md="7">
                                <v-row align="center" justify="center">
                                    <span>Керамика</span>
                                    <v-overflow-btn
                                            height="40px"
                                            style="max-width: 220px; width: 100%"
                                            class="my-2 ml-10"
                                            eager
                                            solo
                                            flat
                                            light
                                            single-line
                                            :items="exampleItems"
                                            label="Выбрать опцию"
                                            dense
                                    ></v-overflow-btn>
                                    <v-btn v-if="newFields.length === 0" class="mx-2 mb-1 ml-6" fab small color="indigo" @click="addNewField()">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-col>
                        </v-row>
                    </client-only>
                    <client-only>
                        <v-row align="center" justify="center" v-if="newFields.length > 0">
                            <v-col align="center" justify="center" cols="12" sm="9" md="7" style="max-width: 700px">
                                    <app-product-add-new-field 
                                        v-for="(item, index) in newFields"
                                        :key="index"
                                        :title="item.title"
                                        :descr="item.descr"
                                        :index="index"
                                        :statusButton="item.statusButton"
                                    />
                            </v-col>
                        </v-row>
                    </client-only>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                    <div class="font-weight-bold title">
                        Описание товара (свойства)
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
            <v-row align="center" justify="center">
                <v-btn class="mx-2 mt-5" fab color="indigo" @click="addField()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-row>
            <v-row align="center" justify="center">
                <v-btn nuxt to="/admin/products/preview" class="mx-2 mt-5" color="teal" :disabled="!checkFields">
                    <v-icon class="mr-2">mdi-folder-image</v-icon>
                    Предпросмотр
                </v-btn>
                <v-btn class="mx-2 mt-5" color="teal" :disabled="!checkFields">
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
    const AppProductAddImage = () => import('~/components/admin/product-add-image/index.vue')
    const AppProductAddNewField = () => import('~/components/admin/product-add-new-field/index.vue')

    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Добавление товара'
        },
        components: {
            AppProductCharacteristics,
            AppProductAddImage,
            AppProductAddNewField
        },
        data() {
            return {
                localTitle: '',
                localPrice: '',
                localDescr: '',
                localArticle: '',
                localDiscountStatus: false,
                localDiscount: '',
                exampleItems: [
                    'Черная',
                    'Белая'
                ],
                localNewFields: []
                
            }
        },
        watch: {
            localDiscountStatus(val) {
                this.$store.dispatch('add-product/setDiscountStatus', val)
            }
            // localPrice(val) {
            //     this.localPrice = ''
            //     // let newPrice = val
            //     // this.localPrice = val.replace(/[^\d]/g, '')
            //     // console.log(this.localPrice)
            // }
        },
        async mounted() {
            this.localTitle = this.title
            this.localPrice = this.price
            this.localDescr = this.descr
            this.localArticle = this.article
            this.localDiscountStatus = this.discountStatus
            this.localDiscount = this.sizeDiscount
            

            if(this.images.length === 0) {
                let data = {
                    file: null,
                    previewImg: null
                }

                await this.setImageField(data)
            }

        },
        computed: {
            other() {
                return this.$store.getters['add-product/other']
            },
            images() {
                return this.$store.getters['add-product/images']
            },
            title() {
                return this.$store.getters['add-product/title']
            },
            price() {
                return this.$store.getters['add-product/price']
            },
            descr() {
                return this.$store.getters['add-product/descr']
            },
            article() {
                return this.$store.getters['add-product/article']
            },
            discountStatus() {
                return this.$store.getters['add-product/discountStatus']
            },
            sizeDiscount() {
                return this.$store.getters['add-product/sizeDiscount']
            },
            statusImage() {
                    if(this.images[0].previewImg !== null) {
                        return true
                    } else {
                        return false
                    }
            },
            checkFields() {
                if( this.title !== '' &&
                    this.price !== '' &&
                    this.descr !== '' &&
                    this.article !== '' && 
                    this.statusImage 
                ) 
                {
                    // if(this.images.length > 0) {
                    //     if(this.images[0].previewImg) {
                    //         console.log(this.images)
                    //         return true
                    //     }
                    // } else {
                    //     return false
                    // }
                    return true
                } else {
                    return false
                }
            },
            newFields() {
                return this.$store.getters['add-product/newFields']
            }

        },
        methods: {
            async addField() {
                let data = {
                    title: '',
                    descr: ''
                }

                this.$store.dispatch('add-product/setField', data)
            },
            async setImageField(data) {
                await this.$store.dispatch('add-product/setImageField', data)
            },
            async clearFields() {
                await this.$store.dispatch('add-product/clearFields')
            },
            async addNewField() {

                let data = {
                    statusButton: true,
                    title: '',
                    descr: []
                }

                this.$store.dispatch('add-product/setNewFields', data)
            },
            async updateTitle(title) {
                this.$store.dispatch('add-product/setTitle', title)
            },
            async updatePrice() {
                this.localPrice = parseInt(this.localPrice)
                this.$store.dispatch('add-product/setPrice', this.localPrice)
            },
            async updateDescr(descr) {
                this.$store.dispatch('add-product/setDescr', descr)
            },
            async updateArticle(article) {
                this.$store.dispatch('add-product/setArticle', article)
            },
            async updateDiscount() {
                this.localDiscount = this.localDiscount.replace(/[^\d]/g, '')
                this.$store.dispatch('add-product/setDiscount', this.localDiscount)
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
    
    #products__example-select .v-text-field__details
        display: none
        border-color: white
    
    #products__example-select .v-input__slot
        border-color: white
        border: 1px solid #8b9620
    
    #products__example-select .v-application
        margin-top: 0px
    
</style>