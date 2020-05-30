<template>
    <v-row align="center" justify="center">
        <v-col align="center" justify="center">
            <v-row align="center" justify="center" class="font-weight-bold title">
                Дополнительные поля
            </v-row>
            <v-row align="center" justify="center" class="font-weight-medium subtitle-1 mt-2 font-italic">
                Пример:
            </v-row>
            <client-only>
                <v-row align="center" justify="center" id="products__example-other-field">
                    <v-col align="center" justify="center" cols="12" sm="9" md="7">
                        <v-row align="center" justify="center">
                            <span>Керамика</span>
                            <v-overflow-btn
                                    height="40px"
                                    style="max-width: 220px; width: 100%"
                                    class="my-2 ml-10"
                                    eager
                                    solo
                                    flat
                                    light
                                    single-line
                                    :items="exampleItems"
                                    label="Выбрать опцию"
                                    dense
                            ></v-overflow-btn>
                            <v-btn v-if="newFields.length === 0" class="mx-2 mb-1 ml-6" fab small color="indigo" @click="addNewField()">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </client-only>
            <client-only>
                <v-row align="center" justify="center">
                    <v-col align="center" justify="center" cols="12" sm="9" md="7" style="max-width: 700px; padding: 0px">
                            <transition-group name="other-field-input">
                                <app-product-add-new-field 
                                    v-for="(item, index) in newFields"
                                    :key="item.token"
                                    :fields="newFields"
                                    :title="item.title"
                                    :descr="item.descr"
                                    :index="index"
                                    :statusButton="item.statusButton"
                                    @update="update"
                                    @remove="remove"
                                    @add="add"
                                />
                            </transition-group>
                    </v-col>
                </v-row>
            </client-only>
        </v-col>
    </v-row>
</template>

<script>

    const AppProductAddNewField = () => import('~/components/admin/product/main/other-field-input/add-new-field.vue')
    const getNewFieldsStore = () => import('~/store/modules/product/newFields.js')

    export default {
        async mounted() {
            if(!this.$store.getters[`modules/product/newFields/newFields`]) {
                await this.$store.registerModule('newFields', getNewFieldsStore)
            }
        },
        data() {
            return {
                exampleItems: [
                    'Черная',
                    'Белая'
                ]
            }
        },
        components: {
            AppProductAddNewField,
        },
        props: [
            'storeUrl'
        ],
        computed: {
            newFields() {
                return this.$store.getters[`modules/product/newFields/newFields`]
            }
        },
        methods: {
            async addNewField() {

                let data = {
                    statusButton: true,
                    title: '',
                    descr: [],
                    token: `${Math.random()}`
                }

                this.$store.dispatch(`modules/product/newFields/setNewFields`, data)
            },
            async update({descr, index, title}) {
                if(descr) {
                    this.$store.dispatch(`modules/product/newFields/updateNewFieldDescr`, {descr, index})
                } else if(title) {
                    this.$store.dispatch(`modules/product/newFields/updateNewFieldTitle`, {title, index})
                }
            },
            async remove({index}) {
                this.$store.dispatch(`modules/product/newFields/removeNewField`, index)
            },
            async add() {
                let data = {
                    title: '',
                    descr: [],
                    token: `${Math.random()}`
                }

                this.$store.dispatch(`modules/product/newFields/setNewFields`, data)
            }
        }
    }
</script>

<style lang="sass">
    #products__example-other-field .v-text-field__details
        display: none
        border-color: white
    
    #products__example-other-field .v-input__slot
        border-color: white
        border: 1px solid #8b9620
    
    #products__example-other-field .v-application
        margin-top: 0px
    
    .other-field-input-enter-active
        animation: product-other-field-input .5s ease-in-out normal forwards

    .other-field-input-leave-active
        animation: product-other-field-input .5s ease-in-out reverse forwards
    
    @keyframes product-other-field-input
        0%
            overflow: hidden
            height: 0px
        100%
            height: 150px
</style>