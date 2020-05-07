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
    export default {
        async mounted() {
            this.localDescr = this.descr
        },
        data() {
            return {
                localDescr: ''
            }
        },
        props: [
            'storeUrl'
        ],
        computed: {
            descr() {
                return this.$store.getters[`${this.storeUrl}descr`]
            }
        },
        methods: {
            async updateDescr(descr) {
                this.$store.dispatch(`${this.storeUrl}setDescr`, descr)
            }
        }
    }
</script>

<style lang="sass">

</style>