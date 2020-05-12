<template>
    <div class="preview-field-with-image-item">
        <div class="preview-field-with-image-item-wrapper">
            <div class="preview-field-with-image-item__type mr-5">
                {{title}}
            </div>
            <div class="preview-field-with-image-item__title font-italic">
                {{name}}
            </div>
        </div>
        <div class="preview-field-with-image-item__images">
            <app-preview-image 
                v-for="(item, index) in info"
                :key="item.token"
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

    const AppPreviewImage = () => import('~/components/admin/product/other-field-with-image/preview-image.vue')

    export default {
        components: {
            AppPreviewImage
        },
        props: [
            'title',
            'info',
            'index'
        ],
        data() {
            return {
                name: '',
                globalIndex: 0
            }
        },
        methods: {
            async mouseEnterImage({index, name, img}) {
                this.globalIndex = index
                this.name = name
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