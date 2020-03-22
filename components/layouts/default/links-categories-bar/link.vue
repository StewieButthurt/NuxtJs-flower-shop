<template>
    <nuxt-link class="link"
        no-prefetch 
        v-show="checkStatus"
        :to="to"
        active-class="link-categories-bar__active-link"
        @mouseenter.native="$emit('changeIndex', index)"
        @mouseleave.native="$emit('changeIndex', false)"
        :class="{'llink-categories-bar__link-hover' : index === globalIndex}"
    >
        {{title}}
    </nuxt-link>
</template>

<script>
    export default {
        props: [
            'to',
            'title',
            'status',
            'index',
            'globalIndex',
            'x'
        ],
        computed: {
            checkStatus() {
                if(this.index > 11) {
                    this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                        index: this.index,
                        status: false
                    })
                    return this.status
                } else if (this.index === 0) {
                    if(this.x > 355) {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 1) {
                    if(this.x > 617) {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 2) {
                    if(this.x > 867) {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 3) {
                    if(this.x > 1107) {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 4) {
                    if(this.x > 1347) {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 5) {
                    if(this.x > 1589) {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 6) {
                    if(this.x > 1840) {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeCategoriesStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } 
            }
        },
    }
</script>

<style lang="sass">

    #defalut-layouts .link
        text-decoration: none 
        text-transform: uppercase
        font-size: 13px
        color: white
        position: relative
        padding: 0px 30px
        display: flex
        align-items: center
        height: 100%
    
    #defalut-layouts .link-categories-bar__active-link
        background-color: #FFA800
    
    .llink-categories-bar__link-hover
        background-color: #689011

</style>