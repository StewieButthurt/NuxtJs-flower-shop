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
            <app-link 
                v-for="(item, index) in categories"
                :key="index"
                :index="index"
                :to="item.to"
                :title="item.title"
                :status="item.status"
                :globalIndex="globalIndex"
                :x="windowSize.x"
                @changeIndex="changeIndex"
            />
            <v-menu
                bottom
                letf
                offset-overflow
                origin="center center"
                transition="slide-y-transition"
                v-show="falseCategoriesLinks.length !== 0"
                max-height="300px"
            >
                <template v-slot:activator="{ on }">
                <!-- <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
                <div v-on="on" v-show="falseCategoriesLinks.length !== 0" class="links-categories-bar__link-more mt-1"> >> </div>
                </template>
        
                <v-list class="logo-app-bar__text-style">
                <v-list-item
                    v-for="(item, index) in falseCategoriesLinks"
                    :key="index"
                    @click="$router.push(item.to)"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                </v-list>
            </v-menu>
        <v-spacer />
    </v-app-bar>
</template>

<script>

    const AppLink = () => import('~/components/layouts/default/links-categories-bar/link.vue')

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
                localDrawer: false,
                globalIndex: false
            }
        },
        computed: {
            categories() {
                return this.$store.getters['layouts-links/categories']
            },
            falseCategoriesLinks() {
                let arr = [];
                for(let i = 0; i < this.categories.length; i++) {
                    if(this.categories[i].status === false) {
                    arr.push(this.categories[i])
                    }
                }

                return arr
            }
        },
        props: [
            'drawer',
            'windowSize'
        ],
        components: {
            AppLink
        },
        methods: {
            async changeIndex(index) {
                this.globalIndex = index
            }
        }
    }
</script>

<style lang="sass">

    #layout-default__v-app-bar .v-toolbar__content
        padding: 0px 16px
    
    #layout-default__v-app-bar .links-categories-bar__link-more
        display: flex
        cursor: pointer
        position: relative
        margin-left: 20px
        color: white
        +xs-block
          position: absolute
          right: 20px
          top: 17px

</style>