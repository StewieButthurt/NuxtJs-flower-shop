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
    export default {
        async mounted() {
            this.localBestseller = this.bestseller
        },
        props: [
            'storeUrl'
        ],
        data() {
            return {
                localBestseller: false
            }
        },
        watch: {
            localBestseller(val) {
                this.$store.dispatch(`${this.storeUrl}setBestseller`, val)
            }
        },
        computed: {
            bestseller() {
                return this.$store.getters[`${this.storeUrl}bestseller`]
            }
        }
    }
</script>

<style lang="sass">

</style>