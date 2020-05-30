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
                <div class="add-image-filepond-component-card__close" @click="clickRemove()" v-if="iconClose">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 455.111 455.111" style="enable-background:new 0 0 455.111 455.111;" xml:space="preserve">
                    <circle style="fill:#E24C4B;" cx="227.556" cy="227.556" r="227.556"/>
                    <path style="fill:#D1403F;" d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333
                        c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
                        C422.4,91.022,455.111,155.022,455.111,227.556z"/>
                    <path style="fill:#FFFFFF;" d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533
                        c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533
                        c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
                        c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
                        C339.911,308.622,339.911,322.844,331.378,331.378z"/>
                    </svg>
                </div>
                <v-img
                    :src="getImage"
                    class="grey darken-4"
                    :eager="true"
                ></v-img>
                <v-card-title v-if="!writeText" class="add-image-filepond-component-card-title">
                    {{index > 0 ? `Картинка №${index + 1}` : firstImageName}}
                    <div 
                        class="add-image-filepond-component-button"  
                        @click="clickRemove()"
                        >
                        <v-icon>mdi-delete-forever</v-icon>
                    </div>
                </v-card-title>
                <v-card-title v-if="writeText" class="add-image-filepond-component-card-title" id="add-image-filepond-component-card-title">
                    <v-text-field 
                        :label="label ? label : ''"
                        v-model="localTitle"
                        class="add-image-filepond__title"
                        @blur="$emit('updateTitleImage', {
                            title: localTitle,
                            index: index
                        })"
                    ></v-text-field>
                </v-card-title>

            </v-card>   
        </div>
    </v-fade-transition>
</template>

<script>
    
    export default {
        props: [
            'index',
            'previewImg',
            'firstImageName',
            'images',
            'writeText',
            'title',
            'label',
            'iconClose'
        ],
        async mounted() {
            if(this.previewImg === false) {
                this.file = false,
                this.newImg = false
            }

            if(this.title) {
                this.localTitle = this.title
            }
        },
        watch: {
            images(val) {
                if(val.length === this.index + 1) {
                    this.file = false,
                    this.newImg = false
                }
            },
            title(val) {
                this.localTitle = val
            }
        },
        data() {
            return {
                file: false,
                newImg: false,
                localTitle: ''
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
    
    .add-image-filepond-component-card__close
        position: absolute
        top: 5px
        right: 5px
        width: 20px
        height: 20px
        z-index: 7
        cursor: pointer
        transition-duration: .2s
    
    .add-image-filepond-component-card__close svg
        width: 100%
        height: 100%
    
    .add-image-filepond-component-card__close:hover
        transform: scale(1.2)
    
    #add-image-filepond-component .v-responsive
        z-index: 0
    
    #add-image-filepond-component input[type='file'] 
        opacity: 0
        cursor: pointer
    
    .add-image-filepond-component-card-title
        font-size: 21px
        display: flex
        justify-content: space-between
        align-items: center
    
    #add-image-filepond-component-card-title .v-text-field__details
        display: none
    
    // #add-image-filepond-component-card-title

    


</style>