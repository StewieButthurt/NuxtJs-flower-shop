<template>
    <div class="preview__specifications">
        <div class="preview__specifications-tabs">
            <v-tabs
                color="black"
            >
                <v-tab @click="clickDescr()">Описание</v-tab>
                <v-tab @click="clickReviews()">Отзывы</v-tab>
            </v-tabs>
            <div class="preview__specifications-tabs-line">
            </div>
        </div>
        <transition name="itemIn" mode="out-in">
            <div key="vtabDescr" class="preview__characterisctics-wrapper" v-if="vtabDescr">
                <app-preview-characteristics 
                    v-for="(item, index) in other"
                    :key="item.title"
                    :index="index"
                    :title="item.title"
                    :descr="item.descr"
                />
            </div>
            <div key="vtabReviews" class="preview__characterisctics-wrapper" v-if="vtabReviews">
                Здесь будут отзывы
            </div>
        </transition>
    </div>
</template>

<script>

    const AppPreviewCharacteristics = () => import('~/components/admin/product/characteristics/preview-characteristics.vue')

    export default {
        data() {
            return {
                vtabDescr: true,
                vtabReviews: false,
            }
        },
        computed: {
            other() {
                return this.$store.getters[`modules/product/other/other`]
            }
        },
        methods: {
            async clickDescr() {
                this.vtabReviews = false
                this.vtabDescr = true

            },
            async clickReviews() {
                this.vtabDescr = false
                this.vtabReviews = true
            }
        },
        components: {
            AppPreviewCharacteristics
        }
    }
</script>

<style lang="sass">
    .preview__specifications
        +size(11)
        +size-md(10)
        +md-block
            padding: 0.8rem
        display: flex
        flex-direction: column
        +size-xs(12)
    
    .preview__specifications-tabs
        position: relative
        margin-top: 70px
    
    .preview__specifications-tabs-line
        position: absolute
        top: 48px
        height: 1px
        background-color: #C8C8C8
        width: 100%
    
    .preview__characterisctics-wrapper
        display: flex
        flex-direction: column
        margin-top: 30px
        max-width: 961px
</style>