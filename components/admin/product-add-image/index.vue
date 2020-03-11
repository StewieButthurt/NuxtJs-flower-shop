<template>
    <v-row align="center" justify="center" style="max-width: 745px" >
        <v-col>
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
        </v-col>
        <v-btn v-if="index !== 0" class="mx-2 ml-5" dark color="indigo" small @click="removeImageField()" max-width="50px">
            <v-icon dark>mdi-delete-forever</v-icon>
        </v-btn>
        <v-btn v-if="images.length - 1 === index" class="mx-2" fab small color="indigo" @click="addImageField()">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-row>
</template>

<script>
    export default {
        data() {
            return {
                file: null,
                previewImg: null,
                rules: [
                  value => !value || value.size < 10000000 || 'Image size should be less than 10 MB!',
                ],
            }
        },
        props: [
            'index',
            'previewImageLocal',
            'fileLocal'
        ],
        mounted() {
            this.file = this.fileLocal,
            this.previewImg = this.previewImageLocal
        },
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


                        await vm.$store.dispatch('add-product/updateDataImage', {data, index})
                    }

                    await readerPreview.readAsDataURL(this.file);
                }

            },
            async removeImageField() {
                let index = this.index
                await this.$store.dispatch('add-product/removeImageField', index)
            },
            async addImageField() {
                let data = {
                    file: null,
                    previewImg: null
                }

                await this.$store.dispatch('add-product/setImageField', data)

            },
            async clearImage() {
                let data = {
                    file: null,
                    previewImg: null
                }

                let index = this.index
                
                 await this.$store.dispatch('add-product/updateDataImage', {data, index})

            }
        },
        computed: {
            images() {
                return this.$store.getters['add-product/images']
            }
        }
    }
</script>

<style lang="sass">

</style>