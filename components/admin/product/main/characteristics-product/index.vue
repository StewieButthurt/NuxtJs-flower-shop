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
                        :key="item.title"
                        :titleLocal="item.title"
                        :descrLocal="item.descr"
                        :index="index"
                        :storeUrl="storeUrl"
                    />
                </transition-group>
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
    </v-col>
</template>

<script>
    
    const AppProductCharacteristics = () => import('~/components/admin/product/characteristics/index.vue')

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
                    descr: ''
                }

                this.$store.dispatch(`${this.storeUrl}setField`, data)
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
        animation: fade-in .5s

    .fade-in-leave-active
        animation: fade-in .3s linear reverse  
    
    @keyframes fade-in
        0%
            opacity: 0
            height: 0px
        100%
            opacity: 1
            height: 160px
</style>