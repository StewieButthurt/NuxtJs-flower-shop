<template>
    <div class="preview__descr">
        <div class="preview__descr-title">
            {{name}}
        </div>
        <div class="preview__descr__descr-rating">
            <v-rating 
                v-model="rating"
                readonly
                background-color="orange lighten-3"
                color="orange"
                hover
                half-increments
            ></v-rating>
            <span style="margin-left: 20px">(Отзывов еще нет)</span>
        </div>
        <div class="preview__descr-line">
        </div>
        <div class="preview__descr-price">
            <app-product-price 
                :price="price"
                :storeUrl="storeUrl"
            />
        </div>
        <div class="preview__descr-text">
            {{descr}}
        </div>
        <div class="preview__descr-article">
            артикул <span>{{article}}</span>
        </div>
        <div class="preview__field-with-image">
            <app-preview-field-with-image 
                v-for="(item, index) in otherFieldImage"
                :key="item.title"
                :index="index"
                :title="item.title"
                :info="item.info"
                @mouseEnterImage="mouseEnterImage"
            />
        </div>
        <div class="preview__descr-other-field preview__descr-price">
            <app-product-other-field 
                v-for="item in newFields"
                :key="item.title"
                :title="item.title"
                :descr="item.descr"
            />
        </div>
        <div class="preview__descr-big-line">
        </div>
        <div class="preview__descr__buttons">
            <div class="preview__descr__counter-wrapper-buttons mr-5 mt-5">
                <div class="preview__descr__buttons-minus" @click="counterMinus()">
                    -
                </div>
                <div class="preview__descr__buttons-result">
                    <span>{{counterProducts}}</span>
                </div>
                <div class="preview__descr__buttons-minus" @click="counterPlus()">
                    +
                </div>
            </div>
            <v-btn
                color="#7CAA1A"
                :disabled="true"
                class="white--text preview__descr__buttons-card mt-5"
            >
                <v-icon class="mr-3" size="24px" right dark>mdi-cart-outline</v-icon>
                В корзину
            </v-btn>
        </div>
    </div>
</template>

<script>

    const AppProductPrice = () => import('~/components/admin/product/price/index.vue')
    const AppPreviewFieldWithImage = () => import('~/components/admin/product/other-field-with-image/preview-field-with-image.vue')
    const AppProductOtherField = () => import('~/components/admin/product/other-field/index.vue')

    export default {
        data() {
            return {
                rating: 0,
                counterProducts: 1,
            }
        },
        props: [
            'storeUrl'
        ],
        computed: {
            name() {
                return this.$store.getters[`${this.storeUrl}name`]
            },
            price() {
                return this.$store.getters[`${this.storeUrl}price`]
            },
            descr() {
                return this.$store.getters[`${this.storeUrl}descr`]
            },
            article() {
                return this.$store.getters[`${this.storeUrl}article`]
            },
            otherFieldImage() {
                return this.$store.getters[`${this.storeUrl}otherFieldImage`]
            },
            newFields() {
                return this.$store.getters[`${this.storeUrl}newFields`]
            },
        },
        methods: {
            async mouseEnterImage(img) {
                this.$emit('mouseEnterImage', img)
            },
            async counterPlus() {
                if(this.counterProducts < 10) {
                    this.counterProducts++
                }
            },
            async counterMinus() {
                if(this.counterProducts > 1) {
                    this.counterProducts--
                }
            }
        },
        components: {
            AppProductPrice,
            AppPreviewFieldWithImage,
            AppProductOtherField
        }
    }
</script>

<style lang="sass">
    .preview__descr
        +size(6)
        display: flex
        flex-direction: column
        margin-left: 40px
        +md-block
            margin-top: 50px
            margin-left: 0px
        +size-md(11)
        +size-xs(12)
    
    .preview__descr-title
        font-family: 'Montserrat-SemiBold'
        font-weight: 600
        font-size: 28px
        margin: 0.5rem
    
    .preview__descr__descr-rating
        display: flex
        align-items: center
        margin-top: 20px
        flex-wrap: wrap
    
    .preview__descr-line
        width: 50px
        height: 2px
        background-color: black
        margin: 0.8rem
        margin-top: 20px
    
    .preview__descr-price
        margin: 0.8rem
    
    .preview__descr-text
        margin: 0.8rem
        font-size: 16px
    
    .preview__descr-article
        margin: 0.8rem
        text-transform: uppercase
        margin-top: 40px
        font-size: 14px
    
    .preview__descr-article span
        margin-left: 10px
    
    .preview__field-with-image
        margin: 0.8rem
        display: flex
        flex-direction: column
    
    .preview__descr-other-field
        display: flex
        flex-direction: column
    
    .preview__descr__buttons
        display: flex
        align-items: center
        margin: 0.8rem
        flex-wrap: wrap
    
    .preview__descr__counter-wrapper-buttons
        display: flex
    
    .preview__descr__buttons-minus
        display: flex
        justify-content: center
        align-items: center
        width: 32px
        height: 52px
        border: 1px solid #BDBDBD
        cursor: pointer
        position: relative
        font-size: 20px
        user-select: none
    
    .preview__descr__buttons-result
        width: 47px
        height: 52px
        font-size: 18px
        border: 1px solid #BDBDBD
        display: flex
        justify-content: center
        align-items: center
        font-family: 'Montserrat-SemiBold'
        font-weight: 600
    
    #preview-container .preview__descr__buttons-card
        width: 161px
        height: 52px
</style>