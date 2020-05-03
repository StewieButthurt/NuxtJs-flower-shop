<template>
    <v-fade-transition mode="out-in">
        <div class="add-image-filepond-component" id="add-image-filepond-component">
            <v-card class="add-image-filepond-component-card">
                <div class="add-image-filepond-component-input">
                    <input 
                    name="myFile"
                    type="file" 
                    title=" "
                    @change="changeFile"
                    >
                </div>
                <v-img
                    :src="getImage"
                    class="grey darken-4"
                    :eager="true"
                ></v-img>
                <v-card-title class="title">{{info.text}}</v-card-title>
            </v-card>   
        </div>
    </v-fade-transition>
</template>

<script>
    
    export default {
        props: [
            'index',
            'info',
            'storeUrl'
        ],
        data() {
            return {
                file: null,
                newImg: null,
                checkDinamImg: null
            }
        },
        watch: {
            // checkDinamImg(val) {
            //     if(val) {
            //         let vm = this
            //         async function encodeImg() {

            //             console.log('init encodeBase64')


            //         }

            //         encodeImg()
            //     }
            // }
        },
        methods: {
            async changeFile(e) {
                if(e.target.files.length > 0) {
                    this.file = e.target.files[0]

                    console.log(this.file)

                    if(this.file.type === 'image/png' || this.file.type === 'image/jpeg') {
                        this.newImg = URL.createObjectURL(this.file)

                        // await this.encodeBase64(this.file)
                        
                        let data = {
                            file: this.file,
                            previewImg: this.file,
                            text: this.info.text
                        }

                        let index = this.index


                        await this.$store.dispatch(`${this.storeUrl}updateDataImage`, {data, index})
                        
                    } else {
                        this.$emit('changeMessage', 'error type')
                    }

                    

                    // console.log(this.newImg)


                }
                
            },
            // async encodeBase64(file) {

            //     let readerPreview = new FileReader();
            //     let vm = this;


            //     readerPreview.onload = async function(e) {
            //         vm.previewImg = e.target.result

            //         let data = {
            //             file: file,
            //             previewImg: vm.previewImg,
            //             text: vm.info.text
            //         }

            //         let index = vm.index


            //         await vm.$store.dispatch(`${vm.storeUrl}updateDataImage`, {data, index})
            //     }

            //     await readerPreview.readAsDataURL(file);
            // }
            
        },
        computed: {
            getImage() {
                if(this.newImg) {
                    return this.newImg
                } else {
                    if(this.info.previewImg) {
                        if(this.info.previewImg.type) {
                            if(this.info.previewImg.type === 'image/png' || this.info.previewImg.type === 'image/jpeg') {
                                this.newImg = URL.createObjectURL(this.info.previewImg)
                                return this.newImg
                            } else {
                                return require('~/assets/' + 'newAdd.jpg')
                            }
                        } else {
                            return require('~/assets/' + `${this.info.previewImg}`)
                        }
                    } else {
                        return require('~/assets/' + 'newAdd.jpg')
                    }
                }
                
            }
        }
    }
</script>

<style lang="sass">

    .add-image-filepond
        cursor: pointer
        max-width: 400px
    
    .add-image-filepond-component
        +size(6)
        margin: 10px 0px
        +size-xs(10)

    .add-image-filepond-component-card
        position: relative
        overflow: hidden
    
    .add-image-filepond-component-input
        position: absolute
        top: 0px
        left: -100%
        width: 200%
        height: 100%
        z-index: 5
        opacity: 0
        cursor: pointer
    
    .add-image-filepond-component-input input
        width: 100%
        height: 100%
        cursor: pointer
        
    
    #add-image-filepond-component .v-responsive
        z-index: 0
    
    #add-image-filepond-component input[type='file'] 
        opacity: 0
        cursor: pointer

</style>