<template>
    <div class="preview__swiper-image-item"
        :class="{'preview__swiper-image-item-hover' : hoverImage && checkStatusMouse}"
        @mouseenter="mouseEnterImage()"
    >
        <div 
            class="preview__swiper-image " 
            :style="{ backgroundImage: `url(${localImage})`, backgroundPosition: 'center center', backgroundSize: 'cover' }">
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'image',
            'index',
            'mainIndex'
        ],
        data() {
            return {
                hoverImage: false
            }
        },
        methods: {
            async mouseEnterImage() {
                this.hoverImage = true

                
                let mainIndex = this.index
                let image = this.image
                
                
                await this.$emit('changeImg', {mainIndex, image})

            }
        },
        computed: {
            checkStatusMouse() {
                if(this.mainIndex !== this.index) {
                    return false
                } else {
                    return true
                }
            },
            localImage() {
                if( typeof this.image === 'object') {
                    if(this.image.type === 'image/png' || this.image.type === 'image/jpeg') {
                        return URL.createObjectURL(this.image)
                    }
                } else {
                    return require('~/assets/' + this.image)                
                }
            }
        }
    }
</script>

<style lang="sass">
    
    .preview__swiper-image-item
        position: relative
    
    .preview__swiper-image-hover
        position: absolute
        left: 0px
        top: 0px
        width: 120%
        height: 120%
        z-index: 2


    .preview__swiper-image-item-hover
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 2px rgba(0, 0, 0, 0.4)
    
    .preview__swiper-image
        z-index: 3

</style>