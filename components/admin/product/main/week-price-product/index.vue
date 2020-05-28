<template>
    <v-row align="center" justify="center" id="products__discount">
        <v-col cols="12" sm="9" md="7" align="center" justify="center" style="max-width: 700px" >
            <v-switch
                v-model="localWeekPrice"
                class="mr-5"
                label="Добавить метку 'Цена недели'"
            ></v-switch>
        </v-col>
    </v-row>
</template>

<script>
    const getWeekPriceStore = () => import('~/store/modules/product/weekPrice.js')

    export default {
        async mounted() {
            if(!this.$store.getters[`${this.storeUrl}weekPrice`]) {
                await this.$store.registerModule('weekPrice', getWeekPriceStore)
            }
            this.localWeekPrice = this.weekPrice
        },
        props: [
            'storeUrl'
        ],
        data() {
            return {
                localWeekPrice: false
            }
        },
        watch: {
            localWeekPrice(val) {
                this.$store.dispatch(`${this.storeUrl}set`, val)
            }
        },
        computed: {
            weekPrice() {
                return this.$store.getters[`${this.storeUrl}weekPrice`]
            }
        }
    }
</script>

<style lang="sass">

</style>