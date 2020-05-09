<template>
    <div class="product-other-field-with-image mt-10" id="product-other-field-with-image">
        <div class="product-other-field-with-image__text-wrapper">
            <v-text-field 
                prepend-inner-icon="mdi-format-title"
                label="Название (Например: 'Цвет')"
                v-model="localTitle"
                class="product-characteristics__field"
                @blur="$emit('updateTitle', {
                    title: localTitle,
                    index: index
                })"
            ></v-text-field>
        </div>
        <div class="product-other-field-with-image__line">
        </div>
        <!-- <app-field-with-image 
            v-for="(item, index) in info"
            :key="item.title"
            :index="index"
            :globalIndex="globalIndex"
            :title="item.title"
            :image="item.image"
            :info="info"
            :storeUrl="storeUrl"
        /> -->
        <v-row align="center" justify="center">
            <app-product-add-image-filepond 
                v-for="(item, index) in info"
                :key="index"
                :images="info"
                :previewImg="item.image.previewImg"
                :firstImageName="'Главная картинка'"
                :writeText="true"
                :label="localTitle"
                :index="index"
                :storeUrl="storeUrl"
                @changeMessage="changeMessage"
                @remove="removeImageFilePond"
                @add="addImageFilePond"
            />
        </v-row>
        <v-row align="center" justify="center">
            <v-btn class="mx-2 mb-5" color="error" @click="$emit('removeBlock', index)">
                <v-icon class="mr-2">mdi-delete-forever</v-icon>
                Удалить этот блок
            </v-btn>
        </v-row>
    </div>
</template>

<script>
    const AppFieldWithImage = () => import('~/components/admin/product/other-field-with-image/field-with-image.vue')
    const AppProductAddImageFilepond = () => import('~/components/admin/product/add-image-filepond/index.vue')


    export default {
        async mounted() {
            this.localTitle = this.title
            this.globalIndex = this.index
        },
        components: {
            AppFieldWithImage,
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
            'index',
            'storeUrl'
        ],
        methods: {
            async changeMessage(value) {
                this.$emit('changeMessage', value)
            },
            async removeImageFilePond(index) {

                await this.$store.dispatch(`${this.storeUrl}removeOtherFieldImage`, {
                    index: index, 
                    globalIndex: this.globalIndex
                })

                let counter = 0

                for(let i = 0; i < this.info.length; i++) {
                    if(this.info[i].image.previewImg) {
                        counter++
                    }
                }

                if(this.info.length === counter) {

                    let data = {
                        title: '',
                        image: {
                            file: null,
                            previewImg: null
                        }
                    }

                    let globalIndex = this.globalIndex

                    await this.$store.dispatch(`${this.storeUrl}setOtherFieldImage`, {data, globalIndex})

                }
            },
            async addImageFilePond({file, previewImg, index}) {
                let data = {
                    file: file,
                    previewImg: previewImg
                }

                // let index = 0
                let globalIndex = this.globalIndex


                await this.$store.dispatch(`${this.storeUrl}updateOtherFieldImage`, {data, index, globalIndex})

                let counter = 0

                for(let i = 0; i < this.info.length; i++) {
                    if(this.info[i].image.previewImg) {
                        counter++
                    }
                }

                if(this.info.length === counter) {

                    let data = {
                        title: '',
                        image: {
                            file: null,
                            previewImg: null
                        }
                    }

                    let globalIndex = this.globalIndex

                    await this.$store.dispatch(`${this.storeUrl}setOtherFieldImage`, {data, globalIndex})

                }
 
            }
        }
    }
</script>

<style lang="sass">

    .product-other-field-with-image
        display: flex
        flex-direction: column
        border: 1px solid black
        animation: product-other-field-with-image .6s
    
    .product-other-field-with-image__line
        height: 1px
        background-color: black
    
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
    


</style>