<template>
    <div class="preview__swiper-image-item"
        @mouseenter="mouseEnterImage()"
        :class="{'preview__swiper-image-item-hover' : hoverImage && checkStatusMouse}"
    >
        <div 
            class="preview__swiper-image " 
            :style="{ backgroundImage: `url(${image})`, backgroundPosition: 'center center', backgroundSize: 'cover' }">
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
            }
        }
    }
</script>

<style lang="sass">

    .preview__swiper-image-item-hover
        border: 2px solid grey

</style>