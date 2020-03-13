<template>
    <div class="product-other-field" id="product-other-field-id">
        <div class="product-other-field__title">
            {{title}}
        </div>
        <div class="product-other-field__select">
            <v-select
                :items="descr"
                label="Не выбрано"
                dense
                solo
                style="width: 270px"
          ></v-select>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'title',
            'descr'
        ]
    }
</script>

<style lang="sass">

    .product-other-field
        display: flex
        align-items: center
        margin-top: 20px
        max-width: 450px
        justify-content: space-between
        +xs-block
            flex-direction: column
            align-items: inherit
    
    .product-other-field__title
        font-weight: 600
        +xs-block
            margin-bottom: 10px
    
    #product-other-field-id .v-text-field__details
        display: none
    
    #product-other-field-id .v-input__slot
        box-shadow: none
        border: 1px #7CAA1A solid
</style>