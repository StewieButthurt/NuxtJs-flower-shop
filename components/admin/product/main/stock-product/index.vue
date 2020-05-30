<template>
    <v-row align="center" justify="center" id="products__discount">
        <v-col cols="12" sm="9" md="7" align="center" justify="center" style="max-width: 700px" >
            <v-switch
                v-model="localStock"
                class="mr-5"
                label="Добавить метку 'Акция'"
            ></v-switch>
        </v-col>
    </v-row>
</template>

<script>
    const getStockStore = () => import('~/store/modules/product/stock.js')

    export default {
        async mounted() {
            if(!this.$store.getters['modules/product/stock/stock']) {
                await this.$store.registerModule('stock', getStockStore)
            }
            this.localStock = this.stock
        },
        data() {
            return {
                localStock: false,
            }
        },
        computed: {
            stock() {
                return this.$store.getters['modules/product/stock/stock']
            }
        },
        watch: {
            localStock(val) {
                this.$store.dispatch(`modules/product/stock/set`, val)
            }
        }
        
    }
</script>

<style lang="sass">

</style>