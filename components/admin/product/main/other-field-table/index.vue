<template>
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
                    <v-col align="center" justify="center" cols="12" sm="9" md="7" style="max-width: 700px; width: 100%">
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
                <v-row align="center" justify="center">
                    <v-col align="center" justify="center" cols="12" sm="9" md="7" style="max-width: 700px">
                            <transition-group name="other-field-image">
                                <app-product-other-field-with-image 
                                    v-for="(item, index) in otherFieldImage"
                                    :key="item.token"
                                    :title="item.title"
                                    :info="item.info"
                                    :index="index"
                                    :storeUrl="storeUrl"
                                    @updateTitle="updateTitle"
                                />
                            </transition-group>
                    </v-col>
                </v-row>
                <div class="other-field-table__button mx-2 mt-5 mb-1 ml-6" @click="addNewFieldWithImage()">
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
            </client-only>
        </v-col>
    </v-row>
</template>

<script>
    const AppProductOtherFieldExampleImage = () => import('~/components/admin/product/main/other-field-table/example.vue')
    const AppProductOtherFieldWithImage = () => import('~/components/admin/product/main/other-field-table/field-image.vue')

    export default {
        data() {
            return {
                colorExample: 'Синий',
                indexExampleHoverImage: false,
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
                ]
            }
        },
        props: [
            'storeUrl'
        ],
        components: {
            AppProductOtherFieldExampleImage,
            AppProductOtherFieldWithImage,
        },
        methods: {
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
                    ],
                    token: `${Math.random()}`
                }

                this.$store.dispatch(`${this.storeUrl}addNewFieldWithImage`, data)
            },
            async updateTitle({title, index}) {
                this.$store.dispatch(`${this.storeUrl}updateOtherFieldTitle`, {title, index})
            }
        },
        computed: {
            otherFieldImage() {
                return this.$store.getters[`${this.storeUrl}otherFieldImage`]
            }
        }
    }
</script>

<style lang="sass">
    #products__example-select .v-text-field__details
        display: none
        border-color: white
    
    #products__example-select .v-input__slot
        border-color: white
        border: 1px solid #8b9620
    
    #products__example-select .v-application
        margin-top: 0px
    
    .other-field-image-enter-active
        animation: field-image 1s ease-in-out normal forwards

    .other-field-image-leave-active
        animation: field-image 1s ease-in-out reverse forwards
    
    @keyframes field-image
        0%
            opacity: 0
            height: 0px
        100%
            height: 550px
            opacity: 1
    
    .other-field-table__button
        width: 40px
        height: 50px
        cursor: pointer
    
    .other-field-table__button svg
        width: 100%
        height: 100%

</style>