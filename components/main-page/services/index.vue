<template>
    <div class="main-sevices">
        <div class="main-sevices__item main-sevices__item-order-1">
            <div class="main-sevices__item-image">
                <img src="~/assets/shipped-1.png" alt="car.png">
            </div>
            <div class="main-sevices__item-text">
                <div class="main-sevices__item-text-title">
                    Доставка и обслуживание
                </div>
                <div class="main-sevices__item-text-descr">
                    Быстро, качественно и недорого доставим вашу покупку до вашего участка.
                </div>
            </div>
        </div>
        <div class="main-sevices__item main-sevices__item-order-2">
            <div class="main-sevices__item-image main-sevices__item-image-size-2">
                <img src="~/assets/farmer.png" alt="farmer.png">
            </div>
            <div class="main-sevices__item-text">
                <div class="main-sevices__item-text-title mt-2">
                    Услуги садовника
                </div>
                <div class="main-sevices__item-text-descr">
                    Доверьте уход за садом профессиональному садовнику.
                </div>
            </div>
        </div>
        <div class="main-sevices__item main-sevices__item-order-3">
            <div class="main-sevices__item-image main-sevices__item-image-size-2">
                <img src="~/assets/new-icon.png" alt="new-icon.png">
            </div>
            <div class="main-sevices__item-text">
                <div class="main-sevices__item-text-title mt-2">
                    Самые новые сорта
                </div>
                <div class="main-sevices__item-text-descr">
                    Мы сотрудничем с лучшими агрономами страны и имеем ранний доступ к новым сортам!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="sass">

    .main-sevices
        margin: 0 auto
        +size(10)
        display: flex
        justify-content: space-around
        flex-wrap: wrap
        +size-xs(12)
    
    .main-sevices__item
        display: flex
        align-items: flex-start
        justify-content: center
        padding-top: 53px
    
    .main-sevices__item-image
        width: 43px
        height: 43px
        margin-right: 20px
    
    .main-sevices__item-image img
        width: 100%
        height: 100%
    
    .main-sevices__item-image-size-2
        width: 49px
        height: 49px
        margin-right: 0px
    
    .main-sevices__item-text
        display: flex
        flex-direction: column
    
    .main-sevices__item-text-title
        font-size: 14px
        text-transform: uppercase
        text-align: center
    
    .main-sevices__item-text-descr
        font-size: 12px
        text-align: center
        max-width: 200px
        margin-top: 17px
    
    .main-sevices__item-order-1
        +size(4)
        +size-lg(6)
        +size-ms(12)
    
    .main-sevices__item-order-2
        +size(4)
        +size-lg(6)
        +size-ms(12)
    
    .main-sevices__item-order-3
        +size(4)
        +size-lg(6)
        +size-ms(12)
</style>