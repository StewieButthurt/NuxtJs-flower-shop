<template>
    <div class="product-other-field-with-image mt-10">
        <div class="product-other-field-with-image__text-wrapper">
            <v-text-field 
                prepend-inner-icon="mdi-format-title"
                label="Название (Например: 'Цвет')"
                v-model="localType"
                class="product-characteristics__field"
                @blur="updateTitle()"
            ></v-text-field>
        </div>
        <div class="product-other-field-with-image__line">
        </div>
        <app-field-with-image 
            v-for="(item, index) in info"
            :key="item.title"
            :index="index"
            :globalIndex="globalIndex"
            :title="item.title"
            :image="item.image"
            :info="info"
        />
        <v-row align="center" justify="center">
            <v-btn class="mx-2 mb-5" color="error" @click="removeBlock()">
                <v-icon class="mr-2">mdi-delete-forever</v-icon>
                Удалить этот блок
            </v-btn>
        </v-row>
    </div>
</template>

<script>
    const AppFieldWithImage = () => import('~/components/admin/product-other-field-with-image/field-with-image.vue')

    export default {
        async mounted() {
            this.localType = this.type
            this.globalIndex = this.index
        },
        components: {
            AppFieldWithImage
        },
        data() {
            return {
                localType: '',
                globalIndex: null
            }
        },
        props: [
            'type',
            'info',
            'index'
        ],
        methods: {
            async removeBlock() {
                this.$store.dispatch('add-product/removeOtherFieldWithImageBlock', this.index)
            },
            async updateTitle() {
                let type = this.localType
                let index = this.index
                this.$store.dispatch('add-product/updateOtherFieldTitle', {type, index})
            }
        }
    }
</script>

<style lang="sass">

    .product-other-field-with-image
        display: flex
        flex-direction: column
        border: 1px solid black
    
    .product-other-field-with-image__line
        height: 1px
        background-color: black
    
    .product-other-field-with-image__text-wrapper
        padding: 20px
</style>