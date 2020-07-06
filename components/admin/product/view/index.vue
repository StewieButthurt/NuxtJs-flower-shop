<template>
    <div class="product-view">
        <div class="product-view__image-container">
            <div class="product-view__image" :style="{ backgroundImage: `url(${mainImage})`, backgroundPosition: 'center center', backgroundSize: 'cover' }">
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log(this.product)
        },
        props: [
            'product'
        ],
        computed: {
            mainImage() {
                try {
                    return require('~/assets/' + this.product.images[0].previewImg)
                } catch(e) {
                    throw e
                }
                
            }
        }
    }
</script>

<style lang="sass">
    .product-view
        +size(2)
        margin-top: 20px
        display: flex
        border: 1px solid black
        max-width: 262px
    
    .product-view__image-container
        width: 100%
        cursor: pointer
        overflow: hidden
        display: flex
        position: relative
    
    .product-view__image
        width: 100%
        padding-top: 100%
    
</style>