<template>
    <v-row align="center" justify="center"> 
        <v-col cols="11" align="center" justify="center">
            <v-row align="center" justify="center">
                <v-img
                    :src="require(img[0])"
                    :lazy-src="require(img[0])"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="300px"
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
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        layout: 'admin',
        async validate({store, redirect}) {
            let img = store.getters['localStorage/images']
            if(!img[0].file) {
                redirect('/admin/products')
            }
        },
        head: {
            title: 'Панель администратора | Предпросмотр'
        },
        computed: {
            img() {
                return this.$store.getters['localStorage/images']
            }
        }
    }
</script>

<style style="lang">

</style>