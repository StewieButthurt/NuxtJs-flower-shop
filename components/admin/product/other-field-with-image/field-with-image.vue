<template>
    <div class="field-with-image">
        <div class="field-with-image-wrapper mr-5">
            <v-text-field 
                prepend-inner-icon="mdi-format-title"
                label="Название"
                v-model="localTitle"
                class="product-characteristics__field"
                @blur="updateTitle()"
            ></v-text-field>
            <v-file-input
                show-size 
                :rules="rules"
                label="Изображение товара"
                accept="image/png, image/jpeg"
                v-model="file"
                @click:clear="clearImage()"
                @change="updateImg()"
                >
            </v-file-input>
        </div>
        <v-btn v-if="index !== 0" class="mx-2 ml-5 mt-5" dark color="indigo" small @click="removeImageField()" max-width="50px">
            <v-icon dark>mdi-delete-forever</v-icon>
        </v-btn>
        <v-btn v-if="info.length - 1 === index " class="mx-2 mt-5" fab small color="indigo" @click="addImageField()">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        async mounted() {
            this.localTitle = this.title
            this.file = this.image.file
            this.previewImg = this.image.previewImg
        },
        data() {
            return {
                localTitle: '',
                file: null,
                previewImg: null,
                rules: [
                  value => !value || value.size < 10000000 || 'Image size should be less than 10 MB!',
                ],
            }
        },
        props: [
            'title',
            'image',
            'index',
            'globalIndex',
            'info'
        ],
        methods: {
            async updateImg() {

                if(this.file) {

                    var readerPreview = new FileReader();
                    var vm = this;


                    readerPreview.onload = async function(e) {
                        vm.previewImg = e.target.result

                        let data = {
                            file: vm.file,
                            previewImg: vm.previewImg
                        }

                        let index = vm.index
                        let globalIndex = vm.globalIndex


                        await vm.$store.dispatch('add-product/updateOtherFieldImage', {data, index, globalIndex})
                    }

                    await readerPreview.readAsDataURL(this.file);
                }

            },
            async removeImageField() {
                let index = this.index
                let globalIndex = this.globalIndex

                await this.$store.dispatch('add-product/removeOtherFieldImage', {index, globalIndex})
            },
            async addImageField() {
                let data = {
                    title: '',
                    image: {
                        file: null,
                        previewImg: null
                    }
                }

                let globalIndex = this.globalIndex

                await this.$store.dispatch('add-product/setOtherFieldImage', {data, globalIndex})

            },
            async updateTitle() {
                let title = this.localTitle
                let globalIndex = this.globalIndex
                let index = this.index

                await this.$store.dispatch('add-product/updateOtherFieldImageTitle', {title, globalIndex, index})
            },
            async clearImage() {
                let data = {
                    file: null,
                    previewImg: null
                }

                let index = this.index
                let globalIndex = this.globalIndex
                
                await this.$store.dispatch('add-product/updateOtherFieldImage', {data, index, globalIndex})
            }
        }
    }
</script>

<style lang="sass">
    .field-with-image
        display: flex
        align-items: center
        padding: 20px
    
    .field-with-image-wrapper
        display: flex
        flex-direction: column
        width: 100%
</style>