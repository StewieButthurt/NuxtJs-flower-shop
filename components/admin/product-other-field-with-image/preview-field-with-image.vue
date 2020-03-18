<template>
    <div class="preview-field-with-image-item">
        <div class="preview-field-with-image-item-wrapper">
            <div class="preview-field-with-image-item__type mr-5">
                {{type}}
            </div>
            <div class="preview-field-with-image-item__title font-italic">
                {{title}}
            </div>
        </div>
        <div class="preview-field-with-image-item__images">
            <app-preview-image 
                v-for="(item, index) in info"
                :key="item.title"
                :index="index"
                :globalIndex="globalIndex"
                :title="item.title"
                :image="item.image"
                @mouseEnterImage="mouseEnterImage"
            />
        </div>
    </div>
</template>

<script>

    const AppPreviewImage = () => import('~/components/admin/product-other-field-with-image/preview-image.vue')

    export default {
        components: {
            AppPreviewImage
        },
        props: [
            'type',
            'info',
            'index'
        ],
        data() {
            return {
                title: '',
                globalIndex: 0
            }
        },
        methods: {
            async mouseEnterImage({index, title, img}) {
                this.globalIndex = index
                this.title = title
                this.$emit('mouseEnterImage', img)
            }
        }
    }
</script>

<style lang="sass">

    .preview-field-with-image-item
        display: flex
        flex-direction: column
    
    .preview-field-with-image-item-wrapper
        display: flex
        align-items: center
    
    .preview-field-with-image-item__images
        display: flex
</style>