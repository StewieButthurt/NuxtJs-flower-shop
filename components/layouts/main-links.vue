<template>
    <span v-show="checkStatus">
        <nuxt-link 
            class="layout-default__link ml-10 main-links__link" 
            no-prefetch 
            :to="to"
            active-class="layout-default__link-active"
            @mouseenter.native="$emit('changeIndex', index)"
            @mouseleave.native="$emit('changeIndex', false)"
            :class="{'layout-default__link-hover' : index === globalIndex}"
            >
            {{title}}
          </nuxt-link>
    </span>
</template>

<script>
    export default {
        props: [
            'title',
            'index',
            'to',
            'status',
            'globalIndex',
            'x'
        ],
        computed: {
            checkStatus() {
                if(this.index > 11) {
                    this.$store.dispatch('layouts-links/changeStatus', {
                        index: this.index,
                        status: false
                    })
                    return this.status
                } else if (this.index === 0) {
                    if(this.x > 533) {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 1) {
                    if(this.x > 725) {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 2) {
                    if(this.x > 922) {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 3) {
                    if(this.x > 1120) {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 4) {
                    if(this.x > 1330) {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 5) {
                    if(this.x > 1545) {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } else if(this.index === 6) {
                    if(this.x > 1745) {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: true
                        })
                        return this.status
                    } else {
                        this.$store.dispatch('layouts-links/changeStatus', {
                            index: this.index,
                            status: false
                        })
                        return this.status
                    }
                } 
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="sass">

    .main-links__link
        font-family: 'Rubik-Medium', sans-serif
        font-weight: normal

    #default-header-logo-links .layout-default__link-hover 
        color: #7CAA1A
        border-bottom: 2px solid #FFA800
</style>