<template>
    <div class="product-characteristics">
        <v-text-field 
            prepend-inner-icon="mdi-format-title"
            label="Свойство"
            v-model="title"
        ></v-text-field>
        <v-text-field 
            prepend-inner-icon="mdi-format-title"
            label="Описание"
            v-model="descr"
        ></v-text-field>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                descr: ''
            }
        }
    }
</script>

<style lang="sass">
    .product-characteristics
        display: flex
</style>