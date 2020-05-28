<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="7" style="max-width: 700px">
            <v-text-field 
            prepend-inner-icon="mdi-file-document"
            label="Артикул (Например: 7623BJ7)"
            v-model="localArticle"
            @blur="updateArticle(localArticle)"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    const getArticleStore = () => import('~/store/modules/product/article.js')

    export default {
        async mounted() {
            if(!this.$store.getters[`${this.storeUrl}article`]) {
                await this.$store.registerModule('article', getArticleStore)
            }
            this.localArticle = this.article
        },
        data() {
            return {
                localArticle: '',
            }
        },
        props: [
            'storeUrl'
        ],
        computed: {
            article() {
                return this.$store.getters[`${this.storeUrl}article`]
            }
        },
        methods: {
            async updateArticle(article) {
                this.$store.dispatch(`${this.storeUrl}set`, article)
            }
        }
    }
</script>

<style lang="sass">

</style>