<template>
    <div 
        class="main-slider__slide" 
        :style="{ backgroundImage: `url(${localImage})`, backgroundPosition: '50% 50%', backgroundSize: 'cover' }">
    </div>
</template>

<script>
    export default {
        props: [
            'image'
        ],
        computed: {
            localImage() {
                try {
                    return require('~/assets/' + this.image)
                } catch(e) {
                    return ''
                }
            }
        }
    }
</script>

<style lang="sass">
    .main-slider__slide
        height: 100%
</style>