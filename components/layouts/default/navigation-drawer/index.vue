<template>
    <v-navigation-drawer
        disable-resize-watcher
        v-model="localDrawer"
        id="layout-default__navigation-drawer"
        app
        light
      >
        <v-list>
          <app-redirect 
            v-for="(item, index) in links"
            :key="item.title"
            :index="index"
            :link="item.link"
            :title="item.title"
          />
          <app-redirect 
            key="Каталог"
            link="#"
            title="Каталог"
          />
          <app-redirect 
            v-for="(item, index) in mainLinks"
            :key="item.title"
            :index="index"
            :link="item.link"
            :title="item.title"
          />
          <app-redirect 
            key="Заказать звонок"
            link="#"
            title="Заказать звонок"
          />
          <v-list-item>
            <div style="display: flex; align-items: center">
              <span style="text-decoration: underline">+7 (977) 537-23-69</span>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>

    const AppRedirect = () => import('~/components/layouts/default/navigation-drawer/redirect.vue')

    export default {
        async mounted() {
            this.localDrawer = this.drawer
        },
        data() {
            return {
                links: [
                    {
                    title: 'Главная',
                    link: '/'
                    }
                ],
                localDrawer: false
            }
        },
        props: [
            'drawer',
            'mainLinks'
        ],
        components: {
          AppRedirect
        },
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