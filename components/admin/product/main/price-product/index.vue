<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="7" style="max-width: 700px">
            <v-text-field
            prepend-inner-icon="mdi-currency-rub"
            label="Цена товара (Пример: 2000)"
            v-model="localPrice"
            @blur="updatePrice()"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    const getPriceStore = () => import('~/store/modules/product/price.js')

    export default {
        async mounted() {
            if(!this.$store.getters['modules/product/price/price']) {
                await this.$store.registerModule('price', getPriceStore)
            }
            this.localPrice = this.price
        },
        data() {
            return {
                localPrice: ''
            }
        },
        computed: {
            price() {
                return this.$store.getters['modules/product/price/price']
            }
        },
        methods: {
            async updatePrice() {
                this.localPrice = parseInt(this.localPrice)

                if(this.localPrice) {
                    this.$store.dispatch('modules/product/price/set', this.localPrice)
                } else {
                    this.localPrice = ''
                }
                
            }
        }
    }
</script>

<style lang="sass">

</style>