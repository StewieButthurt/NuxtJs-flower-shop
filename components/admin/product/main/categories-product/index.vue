<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="7" style="max-width: 700px">
            <app-product-add-categories />
        </v-col>
    </v-row>
</template>

<script>

    const AppProductAddCategories = () => import('~/components/admin/categories/product-add-categories/index.vue')

    export default {
        components: {
            AppProductAddCategories
        }
    }
</script>

<style lang="sass">

</style>