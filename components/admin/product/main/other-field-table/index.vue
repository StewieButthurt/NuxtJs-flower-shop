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
                                    :key="item.title"
                                    :title="item.title"
                                    :info="item.info"
                                    :index="index"
                                    :storeUrl="storeUrl"
                                    @removeBlock="removeBlock"
                                    @updateTitle="updateTitle"
                                />
                            </transition-group>
                    </v-col>
                </v-row>
                <v-btn v-if="newFields.length === 0" class="mx-2 mt-5 mb-1 ml-6" fab small color="indigo" @click="addNewFieldWithImage()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </client-only>
        </v-col>
    </v-row>
</template>

<script>
    const AppProductOtherFieldExampleImage = () => import('~/components/admin/product/other-field-example-image/index.vue')
    const AppProductOtherFieldWithImage = () => import('~/components/admin/product/other-field-with-image/index.vue')

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
                    ]
                }

                this.$store.dispatch(`${this.storeUrl}addNewFieldWithImage`, data)
            },
            async removeBlock(index) {
                await this.$store.dispatch(`${this.storeUrl}removeOtherFieldWithImageBlock`, index)
            },
            async updateTitle({title, index}) {
                this.$store.dispatch(`${this.storeUrl}updateOtherFieldTitle`, {title, index})
            }
        },
        computed: {
            otherFieldImage() {
                return this.$store.getters[`${this.storeUrl}otherFieldImage`]
            },
            newFields() {
                return this.$store.getters[`${this.storeUrl}newFields`]
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
        animation: field-image .5s linear

    .other-field-image-leave-active
        animation: field-image .3s linear reverse 
    
    @keyframes field-image
        0%
            opacity: 0
            height: 0px
        100%
            opacity: 1
            height: 600px
</style>