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
    export default {
        async mounted() {
            this.localName = this.name
        },
        data() {
            return {
                localName: '',
            }
        },
        props: [
            'storeUrl'
        ],
        computed: {
            name() {
                return this.$store.getters[`${this.storeUrl}name`]
            }
        },
        methods: {
            async updateName(name) {
                this.$store.dispatch(`${this.storeUrl}setName`, name)
            }
        }
    }
</script>

<style lang="sass">

</style>