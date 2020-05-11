<template>
    <v-col align="center" justify="center">
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
        <v-row align="center" justify="center">
            <v-col align="center" justify="center">
                <transition-group name="fade-in">
                    <app-product-characteristics 
                        v-for="(item, index) in other"
                        :key="item.token"
                        :titleLocal="item.title"
                        :descrLocal="item.descr"
                        :index="index"
                        :storeUrl="storeUrl"
                        @update="update"
                        @remove="remove"
                    />
                </transition-group>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <div class="main-characteristics-product__button mx-2 mt-5" @click="addField()">
                <svg  enable-background="new 0 0 511.81 511.81" viewBox="0 0 511.81 511.81" xmlns="http://www.w3.org/2000/svg">
                    <path d="m391.81 136.01v150.8l-67.588 208.99h-324.222v-495.79h260.609z" fill="#ccf1ff"/>
                    <path d="m391.81 136.01v150.8l-67.588 208.99h-128.317v-495.79h64.704z" fill="#ade7ff"/>
                    <path d="m391.81 136.01h-131.201v-136z" fill="#80d6ff"/>
                    <circle cx="391.81" cy="391.8" fill="#62de59" r="120"/>
                    <path d="m391.81 511.8c66.168 0 120-53.832 120-120s-53.832-120-120-120z" fill="#3cc569"/>
                    <path d="m436.81 376.3v30h-30.67v30.5h-30v-30.5h-29.33v-30h29.33v-30.5h30v30.5z" fill="#fff"/>
                    <path d="m436.81 376.3v30h-30.67v30.5h-14.33v-91h14.33v30.5z" fill="#daf5ff"/>
                    <path d="m72.17 196.467h247.289v30h-247.289z" fill="#fff"/>
                    <path d="m195.813 196.467h123.646v30h-123.646z" fill="#f6f9fa"/>
                        <g fill="#fff">
                            <path d="m72.17 136.467h123.735v30h-123.735z"/>
                            <path d="m72.17 316.467h123.735v30h-123.735z"/>
                            <path d="m72.17 256.467h173.649v30h-173.649z"/>
                        </g>
                    <path d="m195.813 256.467h50.006v30h-50.006z" fill="#f6f9fa"/>
                </svg>
            </div>
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
    </v-col>
</template>

<script>
    
    const AppProductCharacteristics = () => import('~/components/admin/product/main/characteristics-product/characteristics.vue')

    export default {
        data() {
            return {

            }
        },
        components: {
            AppProductCharacteristics
        },
        props: [
            'storeUrl'
        ],
        computed: {
            other() {
                return this.$store.getters[`${this.storeUrl}other`]
            },
            name() {
                return this.$store.getters[`${this.storeUrl}name`]
            },
            price() {
                return this.$store.getters[`${this.storeUrl}price`]
            },
            images() {
                return this.$store.getters[`${this.storeUrl}images`]
            },
            descr() {
                return this.$store.getters[`${this.storeUrl}descr`]
            },
            article() {
                return this.$store.getters[`${this.storeUrl}article`]
            },
            statusImage() {
                    if(this.images[0].previewImg) {
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
            }
        },
        methods: {
            async clearFields() {
                window.location.reload(true)
            },
            async addField() {
                let data = {
                    title: '',
                    descr: '',
                    token: `${Math.random()}`
                }

                this.$store.dispatch(`${this.storeUrl}setField`, data)
            },
            async update({title, descr, index}) {
                if(title) {
                    this.$store.dispatch(`${this.storeUrl}setOtherTitle`, {index, title})
                } else if(descr) {
                    this.$store.dispatch(`${this.storeUrl}setOtherDescr`, {index, descr})
                }
            },
            async remove({index}) {
                this.$store.dispatch(`${this.storeUrl}removeField`, index)
            }
        }
    }
</script>

<style lang="sass">
    .edit__list-col-1
        min-width: 150px
        padding: 0px
        padding-left: 12px
    
    .edit__list-wrapper
        display: flex
        min-height: 40px
        max-width: 510px

    .edit__list
        width: 100%
        display: flex
        align-items: center
        
    
    .edit__list-col-2
        flex-grow: 1
    
    .edit__list_grey
        background-color: #e8e8e8
    
    .fade-in-enter-active
        animation: fade-in .5s ease-in-out forwards

    .fade-in-leave-active
        animation: fade-in .5s ease-in-out forwards reverse  
    
    @keyframes fade-in
        0%
            overflow: hidden
            height: 0px
        100%
            height: 165px
    
    .main-characteristics-product__button
        width: 30px
        height: 40px
        cursor: pointer
        transition-duration: .2s
    
    .main-characteristics-product__button:hover
        transform: scale(1.2)
    
    .main-characteristics-product__button svg
        width: 100%
        height: 100%
</style>