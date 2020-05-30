<template>
    <v-row align="center" justify="center">
        <div class="products-image-filepond" id="products-image-filepond">
            <app-product-add-image-filepond 
                v-for="(item, index) in images"
                :key="index"
                :images="images"
                :previewImg="item.previewImg"
                :firstImageName="'Главная картинка'"
                :index="index"
                @changeMessage="changeMessage"
                @remove="removeImageFilePond"
                @add="addImageFilePond"
            />
        </div>
    </v-row>
</template>

<script>
    
    const AppProductAddImageFilepond = () => import('~/components/admin/product/main/main-images-product/images-filepond.vue')
    const getImagesStore = () => import('~/store/modules/product/images.js')

    export default {
        async mounted() {
            if(!this.$store.getters[`modules/product/images/images`]) {
                await this.$store.registerModule('images', getImagesStore)
            }
        },
        data() {
            return {

            }
        },
        components: {
            AppProductAddImageFilepond
        },
        computed: {
            images() {
                return this.$store.getters[`modules/product/images/images`]
            }
        },
        methods: {
            async changeMessage(value) {
                this.$emit('changeMessage', value)
            },
            async removeImageFilePond(index) {

                await this.$store.dispatch('modules/product/images/setImages', index)

                let counter = 0

                for(let i = 0; i < this.images.length; i++) {
                    if(this.images[i].previewImg) {
                        counter++
                    }
                }

                if(counter === this.images.length) {
                    
                    let newData = {
                        file: false,
                        previewImg: false
                    }

                    this.$store.dispatch('modules/product/images/setImageField', newData)
                
                }
            },
            async addImageFilePond({file, previewImg, index}) {

                let data = {
                    file: file,
                    previewImg: file
                }

                await this.$store.dispatch('modules/product/images/updateDataImage', {data, index})

                let counter = 0

                for(let i = 0; i < this.images.length; i++) {
                    if(this.images[i].previewImg) {
                        counter++
                    }
                }

                if(this.images.length < 6 && this.images.length === counter) {

                    let newData = {
                        file: false,
                        previewImg: false
                    }

                    this.$store.dispatch('modules/product/images/setImageField', newData)

                }
            }
        }
    }
</script>

<style lang="sass">
    .products-image-filepond
        max-width: 650px
        width: 100%
        margin: 0 auto
        display: flex
        flex-wrap: wrap
        justify-content: center
        +xs-block
            flex-direction: column
            align-items: center
    
    #products-image-filepond .add-image-filepond-component
        +size(4)
        margin: 10px 20px
    
    #products-image-filepond .add-image-filepond-component-card-title
        font-size: 16px
</style>