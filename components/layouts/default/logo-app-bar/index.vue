<template>
    <v-app-bar
        light
        style="position: relative"
        id="default-header-logo-links"
        height="80px"
        max-height="80px"
        app
        flat
        color="white"
      >
        <div class="default__logo">
          logo
        </div>
        <div  id="default__menu-settings" style="width: 100%; height: 23px; overflow: hidden">
          <app-main-links 
            v-for="(item, index) in menu"
            :key="item.index"
            :title="item.title"
            :link="item.link"
            :status="item.status"
            :index="index"
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
            max-height="300px"
            v-show="falseMaimLinks.length !== 0"
          >
            <template v-slot:activator="{ on }">
              <div v-on="on" v-show="falseMaimLinks.length !== 0" class="layout-default__link-more"> >> </div>
            </template>
    
            <v-list class="logo-app-bar__text-style">
              <v-list-item
                v-for="(item, index) in falseMaimLinks"
                :key="index"
                @click="$router.push(item.link)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>
</template>

<script>

    const AppMainLinks = () => import('~/components/layouts/default/logo-app-bar/main-links.vue')

    export default {
        data() {
            return {
                globalIndex: false,
            }
        },
        props: [
            'menu',
            'windowSize'
        ],
        methods: {
            async changeIndex(index) {
                this.globalIndex = index
            },
        },
        computed: {
            falseMaimLinks() {
                let arr = [];
                for(let i = 0; i < this.menu.length; i++) {
                    if(this.menu[i].status === false) {
                    arr.push(this.menu[i])
                    }
                }

                return arr
            }
        },
        components: {
            AppMainLinks
        }
    }
</script>

<style lang="sass">

    #default-header-logo-links .v-toolbar__content
        width: 100%
        padding: 4px 50px
        margin: 0 auto
        +md-block
          padding: 4px 55px 4px 20px
    
    #default-header-logo-links .layout-default__link-more
        display: inline-block
        cursor: pointer
        margin-left: 20px
        +xs-block
          position: absolute
          right: 20px
          top: 29px

    
    #default-header-logo-links .layout-default__link-more:hover
        color: #7CAA1A
    
    .default__logo
        height: 60px
        width: 190px
        min-width: 190px
        margin-right: 45px
        background-color: #FA7E7E
        display: flex
        justify-content: center
        align-items: center
    
    .logo-app-bar__text-style
        font-family: 'Rubik-Medium', sans-serif
        font-weight: normal

        
</style>