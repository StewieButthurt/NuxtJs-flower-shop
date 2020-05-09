<template>
    <v-row align="center" justify="center">
        <div class="products-image-filepond">
            <app-product-add-image-filepond 
                v-for="(item, index) in images"
                :key="index"
                :images="images"
                :previewImg="item.previewImg"
                :firstImageName="'Главная картинка'"
                :index="index"
                :storeUrl="storeUrl"
                @changeMessage="changeMessage"
                @remove="removeImageFilePond"
                @add="addImageFilePond"
            />
        </div>
    </v-row>
</template>

<script>
    
    const AppProductAddImageFilepond = () => import('~/components/admin/product/add-image-filepond/index.vue')

    export default {
        data() {
            return {

            }
        },
        components: {
            AppProductAddImageFilepond
        },
        props: [
            'storeUrl'
        ],
        computed: {
            images() {
                return this.$store.getters[`${this.storeUrl}images`]
            }
        },
        methods: {
            async changeMessage(value) {
                this.$emit('changeMessage', value)
            },
            async removeImageFilePond(index) {

                await this.$store.dispatch(`${this.storeUrl}setImages`, index)

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

                    this.$store.dispatch(`${this.storeUrl}setImageField`, newData)
                
                }
            },
            async addImageFilePond({file, previewImg, index}) {

                let data = {
                    file: file,
                    previewImg: file
                }

                await this.$store.dispatch(`${this.storeUrl}updateDataImage`, {data, index})

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

                    this.$store.dispatch(`${this.storeUrl}setImageField`, newData)

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
        justify-content: space-between
        +xs-block
            flex-direction: column
            align-items: center
</style>