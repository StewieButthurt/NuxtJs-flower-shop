<template>
    <div 
        class="preview-field-with-image-item__image-wrapper mr-5 mt-5"
        @click="mouseEnterImage()"
        :class="{'preview-field-with-image-item__image-wrapper-hover' : index === globalIndex}"
    
    >
        <div 
            class="preview-field-with-image-item__image"
            :style="{ backgroundImage: `url(${getImage})`, backgroundPosition: 'center center', backgroundSize: 'cover' }"
        >

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hoverImage: false,
                newImg: false
            }
        },
        props: [
            'index',
            'globalIndex',
            'title',
            'image'
        ],
        methods: {
            async mouseEnterImage() {
                this.hoverImage = true
                let index = this.index
                let name = this.title
                let img = this.image.previewImg
                this.$emit('mouseEnterImage', {index, name, img})
            }
        },
        computed: {
            getImage() {
                if(this.image.previewImg.type) {
                    if(this.image.previewImg.type === 'image/png' || this.image.previewImg.type === 'image/jpeg') {
                        this.newImg = false
                        this.newImg = URL.createObjectURL(this.image.previewImg)
                        return this.newImg
                    } else {
                        return require('~/assets/' + 'newAdd.jpg')
                    }
                } else {
                    return require('~/assets/' + `${this.image.previewImg}`)
                }
            }
        }
    }
</script>

<style lang="sass">
    .preview-field-with-image-item__image-wrapper
        +size(3)
        cursor: pointer
    
    .preview-field-with-image-item__image
        padding-top: 100%
        width: 100%

    .preview-field-with-image-item__image-wrapper-hover
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 2px rgba(0, 0, 0, 0.4)
</style>