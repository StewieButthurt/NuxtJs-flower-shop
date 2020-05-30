<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="7" style="max-width: 700px">
            <v-textarea
                name="input-7-1"
                :auto-grow="true"
                :dense="true"
                prepend-inner-icon="mdi-grease-pencil"
                label="Описание товара"
                value=""
                v-model="localDescr"
                @blur="updateDescr(localDescr)"
            ></v-textarea>
        </v-col>
    </v-row>
</template>

<script>
    const getDescrStore = () => import('~/store/modules/product/descr.js')

    export default {
        async mounted() {
            if(!this.$store.getters['modules/product/descr/descr']) {
                await this.$store.registerModule('descr', getDescrStore)
            }
            this.localDescr = this.descr
        },
        data() {
            return {
                localDescr: ''
            }
        },
        computed: {
            descr() {
                return this.$store.getters['modules/product/descr/descr']
            }
        },
        methods: {
            async updateDescr(descr) {
                this.$store.dispatch('modules/product/descr/set', descr)
            }
        }
    }
</script>

<style lang="sass">

</style>