<template>
    <v-app-bar
        app
        style="position: relative"
        color="#83ae26"
        id="layout-default__v-app-bar"
        height="64px"
        max-height="64px"
      >
        <v-app-bar-nav-icon @click.stop="localDrawer = !localDrawer" />
        <nuxt-link class="layout-default__link ml-10" no-prefetch to="/">
          Каталог товаров
        </nuxt-link>
        <v-spacer />
    </v-app-bar>
</template>

<script>
    export default {
        async mounted() {
            this.localDrawer = this.drawer
        },
        watch: {
            localDrawer(val) {
                this.$emit('changeDrawer', val)
            },
            drawer(val) {
                this.localDrawer = val
            }
        },
        data() {
            return {
                localDrawer: false
            }
        },
        props: [
            'drawer'
        ]
    }
</script>

<style lang="sass">

    #defalut-layouts .layout-default__link
        text-decoration: none 
        text-transform: uppercase
        font-size: 14px
        color: black
        position: relative
</style>