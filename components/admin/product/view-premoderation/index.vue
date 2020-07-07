<template>
    <div class="product-view"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
    >
        <div class="product-view__image-container">
            <div class="product-view__image" :style="{ backgroundImage: `url(${mainImage})`, backgroundPosition: 'center center', backgroundSize: 'cover' }">
                
            </div>
            <div class="product-view__hover"
                :class="{
                    'product-view__hover-enter' : hover === true,
                    'product-view__hover-leave' : hover === false
                }"
            >
                <div class="product-view__buttons">
                    <div class="product-view__button-save" 
                        @click="clickSave()"
                    >
                        <v-icon
                            color="white"
                            size="20px"
                        >
                            mdi-eye-plus-outline
                        </v-icon>
                        <div class="product-view__button-text">
                            Добавить
                        </div>
                    </div>
                    <div class="product-view__button-line">

                    </div>
                    <div class="product-view__button-delete"
                        @click="clickRemove()"
                    >
                        <v-icon
                            color="white"
                            size="20px"
                        >
                            mdi-delete-forever
                        </v-icon>
                        <div class="product-view__button-text">
                            Удалить
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-view__categories">
            {{categories[0]}}
        </div>
        <div class="product-view__title">
            {{title}}
        </div>
        <div class="product-view__rating" id="product-view__rating">
            <v-rating 
                v-model="rating"
                background-color="#7CAA1A"
                color="#7CAA1A"
                hover
                half-increments
                size="15px"
                readonly
            ></v-rating>
        </div>
        <div class="product-view__price"
            id="product-view__price"
        >
            <app-price 
                :price="price"
                :discountStatus="discountStatus"
                :sizeDiscount="sizeDiscount"
            />
        </div>
    </div>
</template>

<script>
    const AppPrice = () => import('~/components/admin/product/price/index.vue')
    export default {
        props: [
            'image',
            'categories',
            'title',
            'price',
            'discountStatus',
            'sizeDiscount',
            'id'
        ],
        components: {
            AppPrice
        },
        data() {
            return {
                rating: 0,
                hover: null
            }
        },
        computed: {
            mainImage() {
                try {
                    return require('~/assets/' + this.image)
                } catch(e) {
                    throw e
                }
                
            }
        },
        methods: {
            async clickRemove() {
                try {
                    await this.$axios.$delete('/api/product/remove', { data: { id: this.id }})
                    await this.$emit('updateData')
                } catch(e) {
                    await this.$emit('updateDataError')
                    console.error(e)
                }
                
            },
            async clickSave() {

            }
        }
    }
</script>

<style lang="sass">
    .product-view
        width: 200px
        margin-top: 20px
        display: flex
        flex-direction: column
        margin-left: 20px
        margin-right: 20px
        cursor: pointer
    
    .product-view__image-container
        width: 100%
        overflow: hidden
        display: flex
        position: relative
    
    .product-view__image
        width: 100%
        padding-top: 100%
    
    .product-view__categories
        font-size: 12px
        color: #7CAA1A
        margin-top: 10px
    
    .product-view__title
        margin-top: 5px
        font-size: 16px
        color: #000000
    
    .product-view__rating
        display: flex
        align-items: center
        flex-wrap: wrap
    
    #product-view__rating .v-rating .v-icon
        padding: 0px
        padding-right: 1px
    
    .product-view__hover
        width: 100%
        height: 0px
        background-color: #7CAA1A
        position: absolute
        bottom: 0px
        left: 0px
        overflow: hidden

    .product-view__hover-enter
        animation: view-hover .2s forwards
    
    .product-view__hover-leave
        animation: view-leave .2s forwards 
    
    @keyframes view-hover
        0%
            height: 0px
        100%
            height: 30px

    @keyframes view-leave
        0%
            height: 30px
        100%
            height: 0px
    
    .product-view__buttons
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        color: white
    
    .product-view__button-save,
    .product-view__button-delete
        display: flex
        align-items: center
        transition-duration: .1s
    
    .product-view__button-save:hover,
    .product-view__button-delete:hover
        transform: scale(.95)
        transition-duration: .1s
    
    .product-view__button-line
        height: 60%
        width: 1px
        background-color: white
        margin-left: 10px
        margin-right: 5px

    .product-view__button-text
        color: white
        font-size: 10px
        margin-left: 5px
    
    #product-view__price .product-price
        font-size: 15px
        color: #000000

    #product-view__price .product-price__price-old
        font-size: 15px
    
    
</style>