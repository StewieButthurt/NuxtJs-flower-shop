<template>
    <v-row align="center" justify="center" id="products__discount">
        <v-col cols="12" sm="9" md="7" align="center" justify="center" style="max-width: 700px" >
            <v-switch
                v-model="localBestseller"
                class="mr-5"
                label="Добавить метку 'Хит продаж'"
            ></v-switch>
        </v-col>
    </v-row>
</template>

<script>
    const getBestsellerStore = () => import('~/store/modules/product/bestseller.js')

    export default {
        async mounted() {
            if(!this.$store.getters['modules/product/bestseller/bestseller']) {
                await this.$store.registerModule('bestseller', getBestsellerStore)
            }
            this.localBestseller = this.bestseller
        },
        data() {
            return {
                localBestseller: false
            }
        },
        watch: {
            localBestseller(val) {
                this.$store.dispatch('modules/product/bestseller/set', val)
            }
        },
        computed: {
            bestseller() {
                return this.$store.getters['modules/product/bestseller/bestseller']
            }
        }
    }
</script>

<style lang="sass">

</style>