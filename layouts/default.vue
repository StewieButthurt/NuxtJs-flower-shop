<template>
  <v-app id="defalut-layouts" class="light">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
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
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      light
      style="position: relative"
      app
    >
      <nuxt-link class="layout-default__link ml-10 black--text" no-prefetch to="/">
        Каталог товаров
      </nuxt-link>
      <nuxt-link class="layout-default__link ml-10 black--text" no-prefetch to="/">
        Каталог товаров
      </nuxt-link>
      <nuxt-link class="layout-default__link ml-10 black--text" no-prefetch to="/">
        Каталог товаров
      </nuxt-link>
    </v-app-bar>
    <v-app-bar
      :clipped-left="clipped"
      app
      style="position: relative"
      color="#8B9620"
      id="layout-default__v-app-bar"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link class="layout-default__link ml-10" no-prefetch to="/">
        Каталог товаров
      </nuxt-link>
      <v-autocomplete
        v-model="select"
        :items="searchResult"
        prepend-inner-icon="mdi-magnify"
        class="layout-default__combox-search ml-10"
        :search-input.sync="search"
        :menu-props="{value: disabledMenu}"
        item-text="name"
        item-value="name"
        outlined
        dense
        solo
        eager
        flat
        chips
        no-data-text="Совпадения не найдены"
        small-chips
        label="Поиск..."
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="select = ''"
          >
            <v-avatar left>
              <v-img :src="data.item.avatar"></v-img>
            </v-avatar>
            {{ data.item.name }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar>
              <img :src="data.item.avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      color="#8B9620"
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      select: '',
      fixed: false,
      searchResult: [
        {header: 'Категории'}, 
        {name: 'Для дома', group: 'Категории', avatar: require('~/assets/1.png')},
        {name: 'Для сада', group: 'Категории', avatar: require('~/assets/1.png')},
        {name: 'Аксессуары', group: 'Категории', avatar: require('~/assets/1.png')},
        {name: 'Для взлома жеппы', group: 'Категории', avatar: require('~/assets/1.png')},
        { divider: true },
        { header: 'Товары' },
        {name: 'Для страданий', group: 'Товары', avatar: require('~/assets/1.png')},
        {name: 'Тупо', group: 'Товары', avatar: require('~/assets/1.png')},
        {name: 'Минус', group: 'Товары', avatar: require('~/assets/1.png')},
        {name: 'Запас', group: 'Товары', avatar: require('~/assets/1.png')},
        {name: 'Слов', group: 'Товары', avatar: require('~/assets/1.png')}
      ],
      links: [
        {
          icon: 'mdi-home',
          title: 'Главная',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      index: -1,
      nonce: 1,
      menu: false,
      statusMenu: true,
      x: 0,
      search: null,
      y: 0,
    }
  },
    methods: {
      
  },
  computed: {
    disabledMenu() {
      if(this.search) {
        if(this.search.length > 1 && this.statusMenu === true) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  watch: {
    select (val) {
      if(!val) {
        this.statusMenu = true
      }

      if(val) {
        this.statusMenu = true
      }
    }
  }
}
</script>

<style lang="sass">
  #defalut-layouts .layout-default__link
    text-decoration: none 
    color: white
    text-transform: uppercase
    font-size: 14px
  
  #defalut-layouts .layout-default__combox-search
    max-width: 300px
  
  #defalut-layouts .layout-default__combox-search .v-input__control
    height: 35px
    min-height: 0px
  
  #defalut-layouts .layout-default__combox-search .v-input__slot
    margin-bottom: 0px
  
  #defalut-layouts .layout-default__combox-search .v-input__append-inner
    display: none
  
  #defalut-layouts .v-list
    background: white
  
  #layout-default__id-v-chip .v-chip
    cursor: pointer
    color: black
    // background-color: white
    font-weight: 500
</style>
