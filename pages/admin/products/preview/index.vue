<template>
    <v-row align="center" justify="center"> 
        <v-col cols="11" align="center" justify="center">
            <v-row align="center" justify="center">
                <client-only>
                    <v-col cols="10" sm="7"  align="center" justify="center">
                        <v-img
                            :src="img1"
                            :lazy-src="img1"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            max-width="400px"
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
                        </v-img>
                        <v-row align="center" justify="center">
                            <v-col align="center" justify="center">
                                <v-carousel>
                                    <v-carousel-item :key="index" v-for="(item, index) in countSlides">
                                        <!-- <v-layout row>
                                            <v-flex xs4 :key="j" v-for="j in 3">
                                                <img :src="'https://placehold.it/380x500/?text=' + i + '-' + j" alt="">
                                            </v-flex>
                                        </v-layout> -->
                                    </v-carousel-item>
                                </v-carousel>
                            </v-col>
                        </v-row>
                    </v-col>
                </client-only>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Предпросмотр'
        },
        created() {
            if(process.browser) {
                if(this.$store.getters['localStorage/images'][0].previewImg &&
                this.$store.getters['localStorage/title'].length !== 0 &&
                this.$store.getters['localStorage/descr'].length !== 0 &&
                this.$store.getters['localStorage/price'].length !== 0 &&
                this.$store.getters['localStorage/article'].length !== 0
            ) {
                
            } else {
                this.$router.push('/admin/products/')
            }
            }
        },
        mounted() {
            console.log(this.countSlides)
        },
        data() {
            return {
                mainImg: '',
                settings: {
                    "centerMode": true,
                    "centerPadding": "20px",
                    "focusOnSelect": true,
                    "infinite": true,
                    "slidesToShow": 3,
                    "speed": 500
                },
                resultImages: [
                    []
                ]
            }
        },
        computed: {
            images() {
                return this.$store.getters['localStorage/images']
            },
            img1() {
                if(this.images[0].previewImg) {
                    return this.images[0].previewImg
                } else {
                    return ''
                }
            },
            countSlides() {
                let k = this.images.length / 4

                console.log(k)

                if(k % 2 !== 0) {

                } else {
                    k = k++
                }

                console.log(k)
                
                let arr = this.images

                for(let i = 0; i < k; i++) {

                    if(this.images.length >= 4) {
                        for(let c = 0; c < 4; c++) {
                            this.resultImages[i].push(this.images[c].previewImg)
                        }

                        arr.splice(0, 4)
                    } else {
                        for(let c = 0; c < this.images.length; c++) {
                            this.resultImages[i].push(this.images[c].previewImg)
                        }
                    }
                }

                console.log(this.resultImages)
                return this.resultImages
                
            }

        }
    }
</script>

<style style="lang">

</style>