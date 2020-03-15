<template>
    <div class="products__other-fields-example-image-wrapper mt-5 mr-5"
        @mouseenter="mouseEnterImage()"
        :class="{'products__other-fields-example-image-hover' : checkIndex === index}"
    >
        <div class="products__other-fields-example-image"
            :style="{ backgroundImage: `url(${require(`~/assets/${image}`)})`, backgroundPosition: 'center center', backgroundSize: 'cover' }"
        >
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'image',
            'index',
            'checkIndex',
            'color'
        ],
        data() {
            return {
                statusHover: false
            }
        },
        methods: {
            async mouseEnterImage() {
                let index = this.index
                let color = this.color
                this.$emit('disabledHoverImage', {index, color})
            }
        }
    }
</script>

<style lang="sass">
    
    .products__other-fields-example-image-wrapper
        +size(2)
        max-width: 90px
        cursor: pointer
    
    .products__other-fields-example-image
        width: 100%
        padding-top: 100%
    
    .products__other-fields-example-image-hover
        border: 2px solid grey
</style>