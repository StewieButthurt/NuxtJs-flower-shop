<template>
    <div class="product-other-field-with-image-wrapper" id="product-other-field-with-image">
        <v-card class="product-other-field-with-image">
            <div class="product-other-field-with-image__text-wrapper">
                <v-text-field 
                    prepend-inner-icon="mdi-format-title"
                    label="Название (Например: 'Цвет')"
                    solo
                    v-model="localTitle"
                    class="product-characteristics__field"
                    @blur="$emit('updateTitle', {
                        title: localTitle,
                        index: index
                    })"
                ></v-text-field>
            </div>
            <v-row align="center" justify="center">
                <app-product-add-image-filepond 
                    v-for="(item, index) in info"
                    :key="item.token"
                    :images="info"
                    :previewImg="item.image.previewImg"
                    :firstImageName="'Главная картинка'"
                    :writeText="true"
                    :title="item.title"
                    :label="localTitle"
                    :iconClose="true"
                    :index="index"
                    @changeMessage="changeMessage"
                    @remove="removeImageFilePond"
                    @add="addImageFilePond"
                    @updateTitleImage="updateTitleImage"
                />
            </v-row>
            <v-row align="center" justify="end" id="field-image-button">
                <v-icon class="mx-2 mb-5 mt-10 mr-5 field-image-button" size="30px" @click="removeBlock(index)">
                    mdi-delete-forever
                </v-icon>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    const AppProductAddImageFilepond = () => import('~/components/admin/product/main/main-images-product/images-filepond.vue')
    const getOtherFieldImagesStore = () => import('~/store/modules/product/otherFieldImages.js')


    export default {
        async mounted() {
            if(!this.$store.getters[`modules/product/otherFieldImages/therFieldImage`]) {
                await this.$store.registerModule('otherFieldImages', getOtherFieldImagesStore)
            }

            this.localTitle = this.title
            this.globalIndex = this.index
        },
        components: {
            AppProductAddImageFilepond
        },
        data() {
            return {
                localTitle: '',
                globalIndex: null
            }
        },
        props: [
            'title',
            'info',
            'index'
        ],
        methods: {
            async changeMessage(value) {
                this.$emit('changeMessage', value)
            },
            async removeImageFilePond(index) {

                await this.$store.dispatch('modules/product/otherFieldImages/removeOtherFieldImage', {
                    index: index, 
                    globalIndex: this.globalIndex
                })

            },
            async addImageFilePond({file, previewImg, index}) {
                let data = {
                    file: file,
                    previewImg: previewImg,
                    token: `${Math.random()}`
                }

                let globalIndex = this.globalIndex


                await this.$store.dispatch('modules/product/otherFieldImages/updateOtherFieldImage', {data, index, globalIndex})

            },
            async removeBlock(index) {
               
               await this.$store.dispatch('modules/product/otherFieldImages/removeOtherFieldWithImageBlock', index)
                
            },
            async updateTitleImage({title, index}) {
                this.$store.dispatch('modules/product/otherFieldImages/updateOtherFieldImageTitle', {
                    title: title, 
                    globalIndex: this.globalIndex, 
                    index: index
                })
            }
        }
    }
</script>

<style lang="sass">
    
    .product-other-field-with-image
        display: flex
        flex-direction: column
        margin-top: 40px
    
    .product-other-field-with-image__text-wrapper
        padding: 20px
    
    #product-other-field-with-image .add-image-filepond
        cursor: pointer
        max-width: 400px
    
    #product-other-field-with-image .add-image-filepond-component
        +size(4)
        margin: 10px 20px
        +size-xs(5)
    
    #product-other-field-with-image .add-image-filepond-component-card-title
        font-size: 16px
        display: flex
        flex-wrap: nowrap
    
    #product-other-field-with-image .add-image-filepond__title
        z-index: 7
    
    #field-image-button .theme--light.v-icon
        color: red
        opacity: .5
        
    #field-image-button .theme--light.v-icon:hover
        transform: scale(1.2)
        opacity: 1

    
    
</style>