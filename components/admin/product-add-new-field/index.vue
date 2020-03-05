<template>
    <v-row align="center" justify="center">
        <v-col align="center" justify="center">
            <v-text-field 
                prepend-inner-icon="mdi-format-title"
                label="Название"
                v-model="localTitle"
                class="product-characteristics__field"
            ></v-text-field>
            <v-combobox
                v-model="localDescr"
                height="40px"
                @click:enter="addDescr()"
                :items="items"
                :search-input.sync="search"
                hide-no-data
                label="Добавьте варианты"
                multiple
                eager
                persistent-hint
                small-chips
            >
            </v-combobox>
        </v-col>
        <v-btn class="mx-2 mt-5 ml-5" dark color="indigo" small @click="removeField()" max-width="50px">
            <v-icon dark>mdi-delete-forever</v-icon>
        </v-btn>
        <v-btn  v-if="newFields.length === index + 1" class="mx-2 mt-5 ml-6" fab small color="indigo" @click="addNewField()">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-row>
</template>

<script>
    export default {
        props: [
            'title',
            'descr',
            'index',
            'statusButton'
        ],
        mounted() {
            this.localTitle = this.title,
            this.localDescr = this.descr
        },
        data() {
            return {
                localTitle: '',
                localDescr: [],
                search: ''
            }
        },
        watch: {
            localDescr(val) {
                let index = this.index
                this.$store.dispatch('localStorage/updateNewFieldDescr', {val, index})
            },
            localTitle(val) {
                let title = this.localTitle
                let index = this.index
                this.$store.dispatch('localStorage/updateNewFieldTitle', {title, index})
            }
        },
        methods: {
            async addDescr() {
                this.localDescr.push(this.search)
            },
            async removeField() {
                let index = this.index
                this.$store.dispatch('localStorage/removeNewField', index)
            },
            async addNewField() {

                let data = {
                    statusButton: true,
                    title: '',
                    descr: []
                }

                this.$store.dispatch('localStorage/setNewFields', data)
            }
        },
        computed: {
            disabledMenu() {
                if(this.localDescr.length > 0) {
                    return true
                } else {
                    return false
                }
            },
            newFields() {
                return this.$store.getters['localStorage/newFields']
            },
            items() {
                return this.localDescr
            }
        }
    }
</script>

<style lang="sass">

</style>