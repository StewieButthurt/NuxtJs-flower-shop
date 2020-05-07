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
                    {{index > 0 ? `Картинка №${index + 1}` : firstImageName}}
                    <div 
                        class="add-image-filepond-component-button"  
                        @click="clickRemove()"
                        v-if="index > 0 && previewImg"
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
            'storeUrl',
            'previewImg',
            'firstImageName',
            'images'
        ],
        async mounted() {
            if(this.previewImg === false) {
                this.file = false,
                this.newImg = false
            }
        },
        watch: {
            images(val) {
                if(val.length === this.index + 1) {
                    this.file = false,
                    this.newImg = false
                }
            }
        },
        data() {
            return {
                file: false,
                newImg: false
            }
        },
        methods: {
            async changeFile(e) {
                let vm = this
                if(e.target.files.length > 0) {
                    this.file = false
                    this.file = e.target.files[0]
                    this.newImg = false

                    if(this.file.type === 'image/png' || this.file.type === 'image/jpeg') {
                        this.newImg = URL.createObjectURL(this.file)

                        this.$emit('add', {
                            file: this.file,
                            previewImg: this.file,
                            index: this.index
                        })
                        
                    } else {
                        this.$emit('changeMessage', 'error type')
                    }


                }
                
            },
            async clickRemove() {
                if(this.images.length > 1) {
                    if(this.previewImg) {
                        
                        this.newImg = false

                        this.$emit('remove', this.index)
                                            
                    }
                }
            }
        },
        computed: {
            getImage() {
                if(this.newImg) {
                    return this.newImg
                } else {
                    if(this.previewImg) {
                        if(this.previewImg.type) {
                            if(this.previewImg.type === 'image/png' || this.previewImg.type === 'image/jpeg') {
                                this.newImg = false
                                this.newImg = URL.createObjectURL(this.previewImg)
                                return this.newImg
                            } else {
                                return require('~/assets/' + 'newAdd.jpg')
                            }
                        } else {
                            return require('~/assets/' + `${this.previewImg}`)
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