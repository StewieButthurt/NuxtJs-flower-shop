!<template>
    <div class="edit">
        <v-container fluid align-center>
            <v-row>
                <v-col >
                    <div class="font-weight-bold title text-center">
                        Обязательные поля
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7" style="max-width: 700px">
                    <v-text-field
                    prepend-inner-icon="mdi-format-title"
                    label="Название товара"
                    v-model="localName"
                    @blur="updateName(localName)"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7" style="max-width: 700px">
                    <v-text-field
                    prepend-inner-icon="mdi-currency-rub"
                    label="Цена товара (Пример: 2000)"
                    v-model="localPrice"
                    @blur="updatePrice()"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7" style="max-width: 700px">
                    <v-textarea
                        name="input-7-1"
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
                <v-col cols="12" sm="9" md="7" style="max-width: 700px">
                    <v-text-field 
                    prepend-inner-icon="mdi-file-document"
                    label="Артикул (Например: 7623BJ7)"
                    v-model="localArticle"
                    @blur="updateArticle(localArticle)"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="9" md="7" style="max-width: 700px">
                    <app-product-add-categories 
                      :storeUrl="storeUrl"  
                    />
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
            <v-row align="center" justify="center" id="products__discount">
                <v-col cols="12" sm="9" md="7" align="center" justify="center" style="max-width: 700px" >
                    <v-switch
                        v-model="localStock"
                        class="mr-5"
                        label="Добавить метку 'Акция'"
                    ></v-switch>
                </v-col>
            </v-row>
            <v-row align="center" justify="center" id="products__discount">
                <v-col cols="12" sm="9" md="7" align="center" justify="center" style="max-width: 700px" >
                    <v-switch
                        v-model="localBestseller"
                        class="mr-5"
                        label="Добавить метку 'Хит продаж'"
                    ></v-switch>
                </v-col>
            </v-row>
            <v-row align="center" justify="center" id="products__discount">
                <v-col cols="12" sm="9" md="7" align="center" justify="center" style="max-width: 700px" >
                    <v-switch
                        v-model="localWeekPrice"
                        class="mr-5"
                        label="Добавить метку 'Цена недели'"
                    ></v-switch>
                </v-col>
            </v-row>
            <!-- <v-row align="center" justify="center">
                <v-col align="center" justify="center" cols="12" sm="9" md="7" >
                        <app-product-add-image 
                            v-for="(item, index) in images"
                            :key="index"
                            :previewImageLocal="item.previewImg"
                            :fileLocal="item.file"
                            :index="index"
                            :storeUrl="storeUrl"  
                        />
                </v-col>
            </v-row> -->
            <v-row align="center" justify="center">
                <div class="products-image-filepond">
                    <app-product-add-image-filepond 
                        v-for="(item, index) in images"
                        :key="index"
                        :info="item"
                        :index="index"
                        :storeUrl="storeUrl"
                        @changeMessage="changeMessage"
                    />
                </div>
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
                            <v-col align="center" justify="center" cols="12" sm="9" md="7" style="max-width: 700px">
                                <v-row style="padding: 12px">
                                    <span>Цвет:</span>
                                    <span class="ml-5 font-italic">{{colorExample}}</span>
                                </v-row>
                                <v-row style="justify-content: space-between; margin: 10px 0px">
                                    <app-product-other-field-example-image 
                                        v-for="(item, index) in arrImageExample"
                                        :key="index"
                                        :index="index"
                                        :checkIndex="indexExampleHoverImage"
                                        :image="item.img"
                                        :color="item.color"
                                        @disabledHoverImage="disabledHoverImage"
                                    />
                                </v-row>
                            </v-col>
                        </v-row>
                    </client-only>
                    <client-only>
                        <v-row align="center" justify="center" v-if="otherFieldImage.length > 0">
                            <v-col align="center" justify="center" cols="12" sm="9" md="7" style="max-width: 700px">
                                    <app-product-other-field-with-image 
                                        v-for="(item, index) in otherFieldImage"
                                        :key="item.title"
                                        :title="item.title"
                                        :info="item.info"
                                        :index="index"
                                        :storeUrl="storeUrl"
                                    />
                            </v-col>
                        </v-row>
                        <v-btn v-if="newFields.length === 0" class="mx-2 mt-5 mb-1 ml-6" fab small color="indigo" @click="addNewFieldWithImage()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </client-only>
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
                                        :storeUrl="storeUrl"
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
                    <div class="edit__list-wrapper">
                        <div class="edit__list-col-1 edit__list font-weight-bold subtitle-1">
                            <span class="mr-4">Высота</span>
                        </div>
                        <div class="edit__list font-weight-medium subtitle-1">
                            <span>13\50 см</span>
                        </div>
                    </div>
                    <div class="edit__list-wrapper">
                        <div class="edit__list-col-1 edit__list edit__list_grey font-weight-bold subtitle-1">
                            <span class="mr-4">Освещение</span>
                        </div>
                        <div class="edit__list edit__list_grey font-weight-medium subtitle-1">
                            <span>Любит яркий рассеянный свет</span>
                        </div>
                    </div>
                    <div class="edit__list-wrapper">
                        <div class="edit__list-col-1 edit__list font-weight-bold subtitle-1">
                            <span class="mr-4">Влажность воздуха</span>
                        </div>
                        <div class="edit__list font-weight-medium subtitle-1">
                            <span>60%</span>
                        </div>
                    </div>
                    <div class="edit__list-wrapper">
                        <div class="edit__list-col-1 edit__list edit__list_grey font-weight-bold subtitle-1">
                            <span class="mr-4">Температура</span>
                        </div>
                        <div class="edit__list edit__list_grey font-weight-medium subtitle-1">
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
                        :storeUrl="storeUrl"
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
                <v-btn class="mx-2 mt-5" color="error" @click="clearFields()">
                    <v-icon class="mr-2">mdi-delete-forever</v-icon>
                    Очистить поля
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

    const AppProductCharacteristics = () => import('~/components/admin/product/characteristics/index.vue')
    const AppProductAddImage = () => import('~/components/admin/product/add-image/index.vue')
    const AppProductAddImageFilepond = () => import('~/components/admin/product/add-image-filepond/index.vue')
    const AppProductAddNewField = () => import('~/components/admin/product/add-new-field/index.vue')
    const AppProductOtherFieldExampleImage = () => import('~/components/admin/product/other-field-example-image/index.vue')
    const AppProductOtherFieldWithImage = () => import('~/components/admin/product/other-field-with-image/index.vue')
    const AppProductAddCategories = () => import('~/components/admin/categories/product-add-categories/index.vue')
    const AppSnackbars = () => import('~/components/alerts/snackbar-http/index.vue')

    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Добавление товара'
        },
        // async validate({ store, redirect, $axios }) {

        //     try {
        //         await $axios.$get('/api/auth/admin/token')
        //         return true
        //     } catch(e) {
        //         redirect('/login?message=login')
        //     }
            
        // },
        components: {
            AppProductCharacteristics,
            AppProductAddImage,
            AppProductAddImageFilepond,
            AppProductAddNewField,
            AppProductOtherFieldExampleImage,
            AppProductOtherFieldWithImage,
            AppProductAddCategories,
            AppSnackbars
        },
        data() {
            return {
                message: false,
                snackbar: false,
                text: '',
                colorBckg: '',
                colorBtn: '',
                storeUrl: 'product/add/',
                localName: '',
                localPrice: '',
                localDescr: '',
                localArticle: '',
                localStock: false,
                localWeekPrice: false,
                localDiscountStatus: false,
                localBestseller: false,
                localDiscount: '',
                exampleItems: [
                    'Черная',
                    'Белая'
                ],
                localNewFields: [],
                colorExample: 'Синий',
                arrImageExample: [
                    {
                        color: 'Белый',
                        img: 'flower.png'
                    },
                    {
                        color: 'Синий',
                        img: 'other-fields-image-blue.jpg'
                    },
                    {
                        color: 'Красный',
                        img: 'other-fields-image-red.jpg'
                    },
                    {
                        color: 'Зеленый',
                        img: 'other-fields-image-green.jpg'
                    },
                    {
                        color: 'Желтый',
                        img: 'other-fields-image-gold.jpg'
                    }
                ],
                indexExampleHoverImage: false,
                chips: []
            }
        },
        watch: {
            localDiscountStatus(val) {
                this.$store.dispatch(`${this.storeUrl}setDiscountStatus`, val)
            },
            localStock(val) {
                this.$store.dispatch(`${this.storeUrl}setStock`, val)
            },
            localBestseller(val) {
                this.$store.dispatch(`${this.storeUrl}setBestseller`, val)
            },
            localWeekPrice(val) {
                this.$store.dispatch(`${this.storeUrl}setWeekPrice`, val)
            },
            message(val) {
                if(this.message === 'error type') {
                    this.text = 'Картинка должна быть формата png или jpeg!'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                }
            }
        },
        async mounted() {
            this.localName = this.name
            this.localPrice = this.price
            this.localDescr = this.descr
            this.localArticle = this.article
            this.localDiscountStatus = this.discountStatus
            this.localDiscount = this.sizeDiscount
            this.localStock = this.stock
            this.localWeekPrice = this.weekPrice
            this.localBestseller = this.bestseller
            

            // if(this.images.length === 0) {
            //     let data = {
            //         file: null,
            //         previewImg: null
            //     }

            //     await this.setImageField(data)
            // }

        },
        computed: {
            other() {
                return this.$store.getters[`${this.storeUrl}other`]
            },
            images() {
                return this.$store.getters[`${this.storeUrl}images`]
            },
            name() {
                return this.$store.getters[`${this.storeUrl}name`]
            },
            price() {
                return this.$store.getters[`${this.storeUrl}price`]
            },
            descr() {
                return this.$store.getters[`${this.storeUrl}descr`]
            },
            article() {
                return this.$store.getters[`${this.storeUrl}article`]
            },
            discountStatus() {
                return this.$store.getters[`${this.storeUrl}discountStatus`]
            },
            sizeDiscount() {
                return this.$store.getters[`${this.storeUrl}sizeDiscount`]
            },
            stock() {
                return this.$store.getters[`${this.storeUrl}stock`]
            },
            weekPrice() {
                return this.$store.getters[`${this.storeUrl}weekPrice`]
            },
            bestseller() {
                return this.$store.getters[`${this.storeUrl}bestseller`]
            },
            statusImage() {
                    if(this.images[0].previewImg !== null) {
                        return true
                    } else {
                        return false
                    }
            },
            checkFields() {
                if( this.name !== '' &&
                    this.price !== '' &&
                    this.descr !== '' &&
                    this.article !== '' && 
                    this.statusImage 
                ) 
                {
                    return true
                } else {
                    return false
                }
            },
            newFields() {
                return this.$store.getters[`${this.storeUrl}newFields`]
            },
            otherFieldImage() {
                return this.$store.getters[`${this.storeUrl}otherFieldImage`]
            }

        },
        methods: {
            async addField() {
                let data = {
                    title: '',
                    descr: ''
                }

                this.$store.dispatch(`${this.storeUrl}setField`, data)
            },
            async setImageField(data) {
                await this.$store.dispatch(`${this.storeUrl}setImageField`, data)
            },
            async clearFields() {
                await this.$store.dispatch(`${this.storeUrl}clearFields`)
            },
            async addNewField() {

                let data = {
                    statusButton: true,
                    title: '',
                    descr: []
                }

                this.$store.dispatch(`${this.storeUrl}setNewFields`, data)
            },
            async updateName(name) {
                this.$store.dispatch(`${this.storeUrl}setName`, name)
            },
            async updatePrice() {
                this.localPrice = parseInt(this.localPrice)

                if(this.localPrice) {
                    this.$store.dispatch(`${this.storeUrl}setPrice`, this.localPrice)
                } else {
                    this.localPrice = ''
                }
                
            },
            async updateDescr(descr) {
                this.$store.dispatch(`${this.storeUrl}setDescr`, descr)
            },
            async updateArticle(article) {
                this.$store.dispatch(`${this.storeUrl}setArticle`, article)
            },
            async updateDiscount() {
                this.localDiscount = this.localDiscount.replace(/[^\d]/g, '')
                this.$store.dispatch(`${this.storeUrl}setDiscount`, this.localDiscount)
            },
            async disabledHoverImage({index, color}) {
                this.indexExampleHoverImage = index
                this.colorExample = color
            },
            async addNewFieldWithImage() {
                let data = {
                    title: '',
                    info: [
                        {
                            title: '',
                            image: {
                                file: null,
                                previewImg: null
                            }
                        }
                    ]
                }

                this.$store.dispatch(`${this.storeUrl}addNewFieldWithImage`, data)
            },
            async changeSnackbar(value) {
                this.snackbar = value
                this.message = false
            },
            async changeMessage(value) {
                this.message = value
            }
        }
    }
</script>

<style lang="sass">
    .edit__list-wrapper
        display: flex
        min-height: 40px
        max-width: 510px

    .edit__list
        width: 100%
        display: flex
        align-items: center
        
    
    .edit__list-col-1
        min-width: 150px
        padding: 0px
        padding-left: 12px
    
    .edit__list-col-2
        flex-grow: 1
    
    .edit__list_grey
        background-color: #e8e8e8
    
    #products__example-select .v-text-field__details
        display: none
        border-color: white
    
    #products__example-select .v-input__slot
        border-color: white
        border: 1px solid #8b9620
    
    #products__example-select .v-application
        margin-top: 0px
    
    #products__discount .v-input--selection-controls
        margin-top: 0px
    
    .products-image-filepond
        max-width: 650px
        width: 100%
        margin: 0 auto
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        +xs-block
            flex-direction: column
            align-items: center
</style>