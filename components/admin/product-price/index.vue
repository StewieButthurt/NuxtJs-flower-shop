<template>
    <div class="product-price">
        <div class="product-price__default" v-show="!discountStatus">
            {{localPrice}} руб.
        </div>
        <div class="product-price__discount-wrapper" v-show="discountStatus">
            <div class="product-price__price-old">
                {{localPrice}} руб.
                <div class="product-price__price-old-line">
                </div>
            </div>
            <div class="product-price__default">
                {{discountPrice}} руб.
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'price'
        ],
        data() {
            return {
                // discountPrice: ''
            }
        },
        // async mounted() {
        //     this.localPrice = await this.formatPrice(this.price)
        // },
        methods: {
            formatPrice(value) {
                let str = value + ''
                if(str.indexOf(',') === -1) {
                    let val = (str/1).toFixed(2).replace(',', ',')
                    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                } else {
                    return str
                }
            }
        },
        computed: {
            discountStatus() {
                return this.$store.getters['add-product/discountStatus']
            },
            localPrice() {
                return this.formatPrice(this.price)
            },
            sizeDiscount() {
                return this.$store.getters['add-product/sizeDiscount']
            },
            discountPrice() {
                let newPrice = this.price - (this.price / 100 * this.sizeDiscount)
                newPrice = Math.ceil(newPrice)
                return this.formatPrice(newPrice)
            }
        }
    }
</script>

<style lang="sass">

    .product-price
        display: flex
        font-size: 24px
        color: #000000
    
    .product-price__default
        font-weight: 500
        font-family: 'Montserrat-SemiBold'
        font-weight: 600
    
    .product-price__discount-wrapper
        display: flex
        align-items: center
        flex-wrap: wrap
    
    .product-price__price-old
        font-family: 'Montserrat-SemiBold'
        font-weight: 600
        color: #787878
        position: relative
        display: flex
        justify-content: center
        font-size: 21px
        margin-right: 15px
    
    .product-price__price-old-line
        position: absolute
        height: 2px
        width: 100%
        background-color: #787878
        top: 49%
</style>