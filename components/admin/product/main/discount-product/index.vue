<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="7" align="center" justify="center" style="max-width: 700px" >
                <v-text-field 
                    :disabled="!localDiscountStatus"
                    prepend-inner-icon="mdi-percent"
                    label="Скидка % (Например: 10)"
                    v-model="localDiscount"
                    @blur="updateDiscount()"
                ></v-text-field>
                <v-switch
                    v-model="localDiscountStatus"
                    class="mt-5 mr-5"
                    label="Скидка"
                ></v-switch>
        </v-col>
    </v-row>
</template>

<script>
    const getDiscountStore = () => import('~/store/modules/product/discount.js')

    export default {
        async mounted() {

            if(!this.$store.getters['modules/product/discount/sizeDiscount']) {
                await this.$store.registerModule('discount', getDiscountStore)
            }

            this.localDiscount = this.sizeDiscount,
            this.localDiscountStatus = this.discountStatus
        },
        data() {
            return {
                localDiscount: '',
                localDiscountStatus: false,
            }
        },
        computed: {
            sizeDiscount() {
                return this.$store.getters['modules/product/discount/sizeDiscount']
            },
            discountStatus() {
                return this.$store.getters['modules/product/discount/discountStatus']
            }
        },
        watch: {
            localDiscountStatus(val) {
                this.$store.dispatch('modules/product/discount/setStatus', val)
            }
        },
        methods: {
            async updateDiscount() {
                this.localDiscount = this.localDiscount.replace(/[^\d]/g, '')
                this.$store.dispatch('modules/product/discount/set', this.localDiscount)
            }
        }
    }
</script>

<style lang="sass">
    
</style>