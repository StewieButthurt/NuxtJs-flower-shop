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
        <v-btn v-if="index !== 0" class="mx-2 ml-5" dark color="indigo" small @click="changeButton(index - 1, true); removeImageField(index)" max-width="50px">
            <v-icon dark>mdi-delete-forever</v-icon>
        </v-btn>
        <v-btn v-if="statusButton" class="mx-2" fab small color="indigo" @click="addImageField(); changeButton(index, false)">
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
            'statusButton'
        ],
        mounted() {
            this.file = this.fileLocal,
            this.previewImg = this.previewImageLocal
        },
        watch: {
            file(val) {
                let index = this.index
                let file = this.file
                this.$store.dispatch('localStorage/setImagesFile', {index, file})
            },
            previewImg(val) {
                let index = this.index
                let previewImg = this.previewImg
                this.$store.dispatch('localStorage/setImagesPreview', {index, previewImg})
            }
        },
        methods: {
            async updateImg() {

                if(this.file) {

                    var readerPreview = new FileReader();
                    var vm = this;


                    readerPreview.onload = async function(e) {
                        vm.previewImg = e.target.result
                    }

                    await readerPreview.readAsDataURL(this.file);
                }

            },
            async removeImageField(index) {
                this.$store.dispatch('localStorage/removeImageField', index)
            },
            async addImageField() {
                let data = {
                    file: null,
                    previewImg: null,
                    statusButton: true
                }

                this.$store.dispatch('localStorage/setImageField', data)

            },
            async changeButton(index, key) {
                if(key === true) {
                        if(this.images.length - index === 2) {
                            this.$store.dispatch('localStorage/changeButtonAddImage', {index, key})
                        } else {
                            key = false
                            this.$store.dispatch('localStorage/changeButtonAddImage', {index, key})
                        }
                }

                if(key === false) {

                    this.$store.dispatch('localStorage/changeButtonAddImage', {index, key})

                }
                
            }
        },
        computed: {
            images() {
                return this.$store.getters['localStorage/images']
            }
        }
    }
</script>

<style lang="sass">

</style>