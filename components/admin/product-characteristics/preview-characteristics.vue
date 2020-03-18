<template>
    <div class="preview-characteristics"
        :style="{backgroundColor: bgColor}"
    >
        <div class="preview-characteristics__title-wrapper">
            <div class="preview-characteristics__title">
                {{title}}
            </div>

        </div>
        <div class="preview-characteristics__descr-wrapper">
            <div class="preview-characteristics__descr">
                {{descr}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'title',
            'descr',
            'index'
        ],
        computed: {
            bgColor() {
                if((this.index + 1) % 2 !== 0) {
                    return '#ffffff'
                } else {
                    return '#e8e8e8'
                }
            }
        }
    }
</script>

<style lang="sass">

    .preview-characteristics
        display: flex
        align-items: center
    
    .preview-characteristics__title-wrapper
        display: flex
        width: 300px
        flex-wrap: wrap
        padding-top: 5px
        padding-bottom: 5px
        height: 100%

    .preview-characteristics__title
        font-size: 16px
        font-family: 'Montserrat-SemiBold'
        font-weight: 600
    
    .preview-characteristics__descr-wrapper
        display: flex
        flex-wrap: wrap
        width: 100%
        height: 100%
    
    .preview-characteristics__descr
        margin-top: 5px
        margin-bottom: 5px
        font-size: 16px
</style>