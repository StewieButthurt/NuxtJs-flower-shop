<template>
    <v-row align="center" justify="center" style="max-width: 745px" >
        <v-col>
            <v-file-input
            show-size 
            :rules="rules"
            label="Изображение товара"
            accept="image/png, image/jpeg"
            v-model="file"
            @click:clear="file = null, previewImg = null"
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
            'fileLocal',
            'id'
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

                        let id = vm.id

                        await vm.$store.dispatch('image-preview/updateDataImage', {data, id})
                        await vm.$store.dispatch('image-preview/getImage')
                    }

                    await readerPreview.readAsDataURL(this.file);
                }

            },
            async removeImageField() {
                let id = this.id
                await this.$store.dispatch('image-preview/deleteImage', id)
                await this.$store.dispatch('image-preview/getImage')
            },
            async addImageField() {
                let data = {
                    file: null,
                    previewImg: null
                }

                await this.$store.dispatch('image-preview/setDataImage', data)
                await this.$store.dispatch('image-preview/getImage')

            }
        },
        computed: {
            images() {
                return this.$store.getters['image-preview/images']
            }
        }
    }
</script>

<style lang="sass">

</style>