<template>
    <span v-if="checkStatus">
        <nuxt-link 
            class="layout-default__link ml-10" 
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
                    if(this.x > 1110) {
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

</style>