<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="7" style="max-width: 700px">
            <v-text-field
            prepend-inner-icon="mdi-format-title"
            label="Название товара"
            v-model="localName"
            @blur="updateName(localName)"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    const getNameStore = () => import('~/store/modules/product/name.js')

    export default {
        async mounted() {
            if(!this.$store.getters[`modules/product/name/name`]) {
                await this.$store.registerModule('name', getNameStore)
            }
            this.localName = this.name
        },
        data() {
            return {
                localName: '',
            }
        },
        computed: {
            name() {
                return this.$store.getters[`modules/product/name/name`]
            }
        },
        methods: {
            async updateName(name) {
                this.$store.dispatch(`modules/product/name/set`, name)
            }
        }
    }
</script>

<style lang="sass">

</style>