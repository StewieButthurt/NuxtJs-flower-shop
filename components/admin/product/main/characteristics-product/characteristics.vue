<template>
    <div class="product-characteristics" 
        id="product-characteristics"
        >
        <div class="product-characteristics__fields">
            <v-text-field 
            prepend-inner-icon="mdi-format-title"
            label="Свойство"
            v-model="title"
            class="product-characteristics__field"
        ></v-text-field>
        <v-text-field 
            prepend-inner-icon="mdi-grease-pencil"
            label="Описание"
            v-model="descr"
            class="xs-ml-0 product-characteristics__field"
        ></v-text-field>
        </div>
        <v-btn class="mx-2 mt-5 ml-5" dark color="indigo" small @click="removeField()" max-width="50px">
            <v-icon dark>mdi-delete-forever</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                descr: ''
            }
        },
        watch: {
            title(val) {
                this.$emit('update', {
                    index: this.index,
                    title: this.title
                })
            },
            descr(val) {
                this.$emit('update', {
                    index: this.index,
                    descr: this.descr
                })
            }
        },
        props: [
            'index',
            'titleLocal',
            'descrLocal',
            'storeUrl'
        ],
        mounted() {
            this.title = this.titleLocal,
            this.descr = this.descrLocal
        },
        methods: {
            async removeField() {
                await this.$emit('remove', {
                    index: this.index
                })
            }
        },
        watch: {
            index(val) {
                console.log(val)
            }
        }
    }
</script>

<style lang="sass">
    .product-characteristics
        display: flex
        align-items: center
        width: 100%
        max-width: 550px
    
    .product-characteristics__fields
        display: flex
        flex-direction: column
        width: 100%
        margin: 12px
    
    #product-characteristics .product-characteristics__field
        +xs-block
            width: 100%
    
        
    
</style>