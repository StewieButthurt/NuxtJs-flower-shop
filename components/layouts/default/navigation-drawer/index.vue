<template>
    <v-navigation-drawer
        disable-resize-watcher
        v-model="localDrawer"
        id="layout-default__navigation-drawer"
        app
        light
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in links"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in mainLinks"
            :key="item.title"
            :index="index"
            :to="item.to"
            router
            exact
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="#">
            <v-list-item-content>
              <v-list-item-title v-text="'Заказать звонок'" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <div style="display: flex; align-items: center">
              <span style="text-decoration: underline">+7 (977) 537-23-69</span>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
    export default {
        async mounted() {
            this.localDrawer = this.drawer
        },
        data() {
            return {
                links: [
                    {
                    icon: 'mdi-home',
                    title: 'Главная',
                    to: '/'
                    }
                ],
                localDrawer: false
            }
        },
        props: [
            'drawer',
            'mainLinks'
        ],
        watch: {
            localDrawer(val) {
                this.$emit('changeDrawer', val)
            },
            drawer(val) {
                this.localDrawer = val
            }
        }
    }
</script>

<style lang="sass">
    
    #layout-default__navigation-drawer .v-list
        padding: 0px
    
    #layout-default__navigation-drawer .v-list-item
        min-height: 40px
        max-height: 40px
</style>