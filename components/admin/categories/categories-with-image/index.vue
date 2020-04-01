<template>
    <div 
        class="categories-with-image__item-wrapper"
        :class="{
            'categories-with-image__item-big' : checkCount,
            'categories-with-image__item-small' : !checkCount
            }"
    >   
            <v-img
                :src="localImg"
                :lazy-src="localImg"
                aspect-ratio="1.54"
                class="grey lighten-2 categories-with-image__item"
                width="100%"
                style="position: relative"
                v-if="checkCount"
                >
                <template v-slot:placeholder>
                    <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                    >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                </template>
                <svg style="position: absolute; top: 20%; left: 60%; " width="40%" height="20%" viewBox="0 -200 1000 300"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <text style="display: fles; flex-wrap: wrap" font-size="130" fill="black">{{title}}</text>
                </svg>
                <!-- <div class="categories-with-image__title" style="left: 63%; top: 73%">
                    {{title}}
                </div> -->
            </v-img>
            <v-img
                :src="localImg"
                :lazy-src="localImg"
                aspect-ratio="0.74"
                style="position: relative"
                v-if="!checkCount"
                width="100%"
                class="grey lighten-2 categories-with-image__item"
                >
                <template v-slot:placeholder>
                    <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                    >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                </template>
                <!-- <div class="categories-with-image__title" style="left: 55%">
                    {{title}}
                </div> -->
            </v-img>
    </div>
    
</template>

<script>
    export default {
        props: [
            'title',
            'descr',
            'link',
            'img',
            'id',
            'count'
        ],
        computed: {
            checkCount() {
                if(this.count === 0) {
                    return true
                } else if(this.count === 1) {
                    return false
                } else if(this.count === 2) {
                    return false
                } else if(this.count === 3) {
                    return false
                } else if(this.count === 4) {
                    return false
                } else if(this.count === 5) {
                    return true
                }
            },
            localImg() {
                try {

                    let img = require('~/assets/' + this.img)
                    console.log(img)
                    return img
                } catch(e) {
                    console.log(e)
                    return ''
                }
            }
        }
    }
</script>

<style lang="sass">
    .categories-with-image__item-big
        +size(5.9)
        +size-ms(12)
        display: flex
        flex-wrap: wrap
        margin-top: 2%
    
    .categories-with-image__item-small
        +size(3)
        +size-lg(3.1)
        +size-ms(7)
        display: flex
        flex-wrap: wrap
        margin-top: 2%
    
    .categories-with-image__item-wrapper
        overflow: hidden
    
    .categories-with-image__item
        cursor: pointer
        transition-duration: 0.2s

    .categories-with-image__item:hover
        transition-duration: 0.2s
        transform: scale(1.1)
    
    // .categories-with-image__title
    //     font-size: 17px
    //     position: absolute
    //     font-family: 'Rubik-Bold', sans-serif
    //     +lgXX-block
    //         font-size: 1.1vw
    //     +ms-block
    //         font-size: 1.9vw
    //     +xs-block
    //         font-size: 3vw


</style>