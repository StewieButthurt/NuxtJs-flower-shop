<template>
    <div class="products-edit" id="products-edit">
        <v-container fluid align-center>
            <v-row>
                <v-col>
                    <div class="font-weight-bold title text-center">
                        Поиск товара для редактирования
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                    <v-autocomplete
                        v-model="select"
                        style="max-width: 400px"
                        :items="searchResult"
                        class="layout-default__combox-search mt-5"
                        :search-input.sync="search"
                        :menu-props="{value: disabledMenu}"
                        item-text="name"
                        outlined
                        color="black"
                        dense
                        solo
                        return-object
                        eager
                        flat
                        chips
                        no-data-text="Совпадения не найдены"
                        small-chips
                        label="Поиск товаров..."
                        >
                        <template v-slot:selection="data">
                            <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            @click="data.select"
                            @click:close="select = ''"
                            >
                            <v-avatar left>
                                <v-img :src="data.item.avatar"></v-img>
                            </v-avatar>
                            {{ data.item.name }}
                            </v-chip>
                        </template>
                        <template v-slot:item="data">
                            <template>
                                <v-list-item-avatar>
                                    <img :src="data.item.avatar">
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>
                </v-col>

            </v-row>
        </v-container>
        <app-snackbars 
            :snackbar="snackbar"
            :text="text"
            :colorBckg="colorBckg"
            :colorBtn="colorBtn"
            @changeSnackbar="changeSnackbar"
        />
    </div>
</template>

<script>

    const getEditStore = () => import('~/store/modules/product/edit.js')
    const getNameStore = () => import('~/store/modules/product/name.js')
    const getPriceStore = () => import('~/store/modules/product/price.js')
    const getDescrStore = () => import('~/store/modules/product/descr.js')
    const getArticleStore = () => import('~/store/modules/product/article.js')
    const getCategoriesStore = () => import('~/store/modules/product/categories.js')
    const getDiscountStore = () => import('~/store/modules/product/discount.js')
    const getStockStore = () => import('~/store/modules/product/stock.js')
    const getBestsellerStore = () => import('~/store/modules/product/bestseller.js')
    const getWeekPriceStore = () => import('~/store/modules/product/weekPrice.js')
    const getImagesStore = () => import('~/store/modules/product/images.js')
    const getOtherFieldImagesStore = () => import('~/store/modules/product/otherFieldImages.js')
    const getNewFieldsStore = () => import('~/store/modules/product/newFields.js')
    const getOtherStore = () => import('~/store/modules/product/other.js')
    const AppSnackbars = () => import('~/components/alerts/snackbar-http/index.vue')
    const getSnackbarStore = () => import('~/store/modules/alert/snackbar.js')

    export default {
        async mounted() {
            if(!this.$store.getters['modules/product/edit/product']) {
                await this.$store.registerModule('edit', getEditStore)
            }

            if(!this.$store.getters[`modules/product/name/name`]) {
                await this.$store.registerModule('name', getNameStore)
            }

            if(!this.$store.getters['modules/product/price/price']) {
                await this.$store.registerModule('price', getPriceStore)
            }

            if(!this.$store.getters['modules/product/descr/descr']) {
                await this.$store.registerModule('descr', getDescrStore)
            }

            if(!this.$store.getters['modules/product/article/article']) {
                await this.$store.registerModule('article', getArticleStore)
            }

            if(!this.$store.getters['modules/product/categories/categories']) {
                await this.$store.registerModule('categories', getCategoriesStore)
            }

            if(!this.$store.getters['modules/product/discount/sizeDiscount']) {
                await this.$store.registerModule('discount', getDiscountStore)
            }

            if(!this.$store.getters['modules/product/stock/stock']) {
                await this.$store.registerModule('stock', getStockStore)
            }

            if(!this.$store.getters['modules/product/bestseller/bestseller']) {
                await this.$store.registerModule('bestseller', getBestsellerStore)
            }

            if(!this.$store.getters['modules/product/weekPrice/weekPrice']) {
                await this.$store.registerModule('weekPrice', getWeekPriceStore)
            }

            if(!this.$store.getters[`modules/product/images/images`]) {
                await this.$store.registerModule('images', getImagesStore)
            }

            if(!this.$store.getters['modules/product/otherFieldImages/otherFieldImage']) {
                await this.$store.registerModule('otherFieldImages', getOtherFieldImagesStore)
            }

            if(!this.$store.getters[`modules/product/newFields/newFields`]) {
                await this.$store.registerModule('newFields', getNewFieldsStore)
            }

            if(!this.$store.getters[`modules/product/other/other`]) {
                await this.$store.registerModule('other', getOtherStore)
            }

            if(!this.$store.getters['modules/alert/snackbar/snackbar']) {
                await this.$store.registerModule('snackbar', getSnackbarStore)
            }

            

        },
        components: {
            AppSnackbars
        },
        layout: 'admin',
        async validate({ store, redirect, $axios }) {
            try {

                if(!store.getters['modules/auth/token']) {
                    await store.dispatch('modules/auth/autoLogin')
                }
                
                await $axios.$get('/api/auth/admin/token')
                return true
            } catch(e) {
                redirect('/login?message=login')
            }
        },
        head: {
            title: 'Панель администратора | Редактирование товара'
        },
        data() {
            return {
                select: '',
                searchResult: [],
                search: null,
                statusMenu: true,
                infoProduct: false
            }
        },
        methods: {
            async changeSnackbar(value) {
                this.$store.dispatch('modules/alert/snackbar/setSnackbar', value)
                this.$store.dispatch('modules/alert/snackbar/setMessage', false)
            }
        },
        computed: {
            disabledMenu() {
                if(this.search) {
                    if(this.search.length > 1 && this.statusMenu === true) {
                    return true
                    } else {
                    return false
                    }
                } else {
                    return false
                }
            },
            product() {
                return this.$store.getters['modules/product/edit/product']
            },
            message() {
                return this.$store.getters['modules/alert/snackbar/message']
            },
            snackbar() {
                return this.$store.getters['modules/alert/snackbar/snackbar']
            },
            text() {
                return this.$store.getters['modules/alert/snackbar/text']
            },
            colorBckg() {
                return this.$store.getters['modules/alert/snackbar/colorBckg']
            },
            colorBtn() {
                return this.$store.getters['modules/alert/snackbar/colorBtn']
            }
        },
        watch: {
            async search (val) {
                let vm = this
                this.searchResult = []
                if(val && val.length > 1) {
                   await this.$axios.$get('/api/product/get-product-search', { params: { search: val } })
                        .then(async function (response) {

                                if(response.name.length !== 0) {

                                    for(let i = 0; i < response.name.length; i++) {

                                        let group = [];

                                        for(let k = 0; k < response.name[i].categories.length; k++) {
                                            group.push(` ${response.name[i].categories[k]}`)
                                        }

                                        vm.searchResult.push({
                                            name: `${response.name[i].name}, ${response.name[i].article}`,
                                            group: `${group}`,
                                            avatar: require('~/assets/' + response.name[i].images[0].previewImg),
                                            id: `${response.name[i]._id}`
                                        })

                                    }
                                }

                                if(response.article.length !== 0) {
                                    for(let i = 0; i < response.article.length; i++) {

                                        let group = [];

                                        for(let k = 0; k < response.article[i].categories.length; k++) {
                                            group.push(` ${response.article[i].categories[k]}`)
                                        }

                                        vm.searchResult.push({
                                            name: `${response.article[i].name}, ${response.article[i].article}`,
                                            group: `${group}`,
                                            avatar: require('~/assets/' + response.article[i].images[0].previewImg),
                                            id: `${response.name[i]._id}`
                                        })

                                    }
                                }
                                
                        })
                        .catch(function (error) {
                            if(error.response) {
                                if(error.response.status === 429) {
                                    vm.$store.dispatch('modules/alert/snackbar/setText', 'Превышен лимит запросов! Повторите попытку через 5 минут!')
                                    vm.$store.dispatch('modules/alert/snackbar/setColorBtn', 'white')
                                    vm.$store.dispatch('modules/alert/snackbar/setColorBckg', 'grey darken-4')
                                    vm.$store.dispatch('modules/alert/snackbar/setSnackbar', true)
                                } else {
                                    console.log(error);
                                }
                            } else {
                                console.log(error);
                            throw error
                            }
                            
                        })
                } else {
                    this.search = null
                }
            },
            async select(val) {

                await this.$store.dispatch('modules/product/edit/setProduct', null)

                let product = await this.$axios.$get('/api/product/get-product-id', {params: {id: val.id}})

                await this.$store.dispatch('modules/product/edit/setProduct', product)

                await this.$store.dispatch('modules/product/name/set', this.product.name)
                await this.$store.dispatch('modules/product/price/set', this.product.price)
                await this.$store.dispatch('modules/product/descr/set', this.product.descr)
                await this.$store.dispatch('modules/product/article/set', this.product.article)
                await this.$store.dispatch('modules/product/categories/set', this.product.categories)
                await this.$store.dispatch('modules/product/discount/setStatus', this.product.discountStatus)
                await this.$store.dispatch('modules/product/discount/set', this.product.sizeDiscount)
                await this.$store.dispatch('modules/product/stock/set', this.product.stock)
                await this.$store.dispatch('modules/product/bestseller/set', this.product.bestseller)
                await this.$store.dispatch('modules/product/weekPrice/set', this.product.weekPrice)
                
                for(let i = 0; i < this.product.images.length; i++) {
                    let data = {
                        file: this.product.images[i].previewImg,
                        previewImg: this.product.images[i].previewImg
                    }

                    await this.$store.dispatch('modules/product/images/updateDataImage', {data, index: i})
                }

                for(let i = 0; i < this.product.otherFieldImage.length; i++) {

                    let data = {
                        title: this.product.otherFieldImage[i].title,
                        info: [
                            {
                                title: '',
                                image: {
                                    file: null,
                                    previewImg: null
                                },
                                token: `${Math.random()}`
                            }
                        ],
                        token: `${Math.random()}`
                    }
                    
                    await this.$store.dispatch('modules/product/otherFieldImages/addNewFieldWithImage', data)

                    for(let j = 0; j < this.product.otherFieldImage[i].info.length; j++) {
                        let dataInfo = {
                            file: this.product.otherFieldImage[i].info[j].image.previewImg,
                            previewImg: this.product.otherFieldImage[i].info[j].image.previewImg,
                            token: `${Math.random()}`
                        }
                        await this.$store.dispatch('modules/product/otherFieldImages/updateOtherFieldImage', 
                        {data: dataInfo, index: j, globalIndex: i})

                        await this.$store.dispatch('modules/product/otherFieldImages/updateOtherFieldImageTitle',
                        {title: this.product.otherFieldImage[i].info[j].title, globalIndex: i, index: j})
                    }

                }

                for(let i = 0; i < this.product.newFields.length; i++) {

                    let data = {
                        title: this.product.newFields[i].title,
                        descr: this.product.newFields[i].descr,
                        token: `${Math.random()}`
                    }

                    this.$store.dispatch(`modules/product/newFields/setNewFields`, data)
                
                }

                for(let i = 0; i < this.product.other.length; i++) {
                    let data = {
                        title: this.product.other[i].title,
                        descr: this.product.other[i].descr,
                        token: `${Math.random()}`
                    }

                    this.$store.dispatch(`modules/product/other/setField`, data)
                }

                this.$router.push('/admin/products-edit/edit')
            }
        }
    }
</script>

<style lang="sass">
    
    #products-edit .layout-default__combox-search
        max-width: 400px
        margin-left: 0px
        +xs-block
          margin-left: 0px
          max-width: 100%
    
    #products-edit fieldset
        border: 1px solid currentColor
    
    #inspire .v-menu__content 
        max-width: 400px
    
</style>