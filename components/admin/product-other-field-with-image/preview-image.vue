<template>
    <div 
        class="preview-field-with-image-item__image-wrapper mr-5 mt-5"
        @click="mouseEnterImage()"
        :class="{'preview-field-with-image-item__image-wrapper-hover' : index === globalIndex}"
    
    >
        <div 
            class="preview-field-with-image-item__image"
            :style="{ backgroundImage: `url(${image.previewImg})`, backgroundPosition: 'center center', backgroundSize: 'cover' }"
        >

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hoverImage: false
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
                let title = this.title
                let img = this.image.previewImg
                this.$emit('mouseEnterImage', {index, title, img})
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
        border: 2px solid grey
</style>