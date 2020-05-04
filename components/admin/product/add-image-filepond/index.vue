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
                <v-card-title class="title add-image-filepond-component-card-title">
                    {{index > 0 ? `Картинка №${index + 1}` : 'Главная картинка'}}
                    <div 
                        class="add-image-filepond-component-button"  
                        @click="clickRemove()"
                        v-if="index > 0 && info.previewImg"
                        >
                        <v-icon>mdi-delete-forever</v-icon>
                    </div>
                </v-card-title>
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
        methods: {
            async changeFile(e) {
                if(e.target.files.length > 0) {
                    this.file = e.target.files[0]

                    console.log(this.file)

                    if(this.file.type === 'image/png' || this.file.type === 'image/jpeg') {
                        this.newImg = URL.createObjectURL(this.file)

                        let data = {
                            file: this.file,
                            previewImg: this.file
                        }

                        let index = this.index


                        await this.$store.dispatch(`${this.storeUrl}updateDataImage`, {data, index})

                        if(this.images.length < 6 && this.images.length === this.index + 1) {

                            let newData = {
                                file: false,
                                previewImg: false
                            }
                            this.$store.dispatch(`${this.storeUrl}setImageField`, newData)
                        }
                        
                    } else {
                        this.$emit('changeMessage', 'error type')
                    }


                }
                
            },
            async clickRemove() {
                if(this.images.length > 1) {
                    if(this.info.previewImg) {
                        

                        this.$store.dispatch(`${this.storeUrl}setImages`, this.index)

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
                        
                    
                    }
                }
            }
        },
        computed: {
            getImage() {
                if(this.newImg) {
                    return this.newImg
                } else {
                    if(this.info.previewImg) {
                        if(this.info.previewImg.type) {
                            if(this.info.previewImg.type === 'image/png' || this.info.previewImg.type === 'image/jpeg') {
                                this.newImg = false
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
                
            },
            images() {
                return this.$store.getters[`${this.storeUrl}images`]
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
    
    .add-image-filepond-component-button
        z-index: 6
        cursor: pointer
        transition-duration: .2s
        opacity: .3
    
    .add-image-filepond-component-button:hover
        transform: scale(1.2)
        opacity: 1
    
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
    
    #add-image-filepond-component .add-image-filepond-component-card-title
        display: flex
        justify-content: space-between
        align-items: center


</style>