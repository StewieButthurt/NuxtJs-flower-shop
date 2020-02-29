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
      <v-combobox
        :hide-no-data="!search"
        :search-input.sync="search"
        hide-selected
        class="layout-default__combox-search ml-10"
        label="Поиск..."
        small-chips
        solo
        light
        height="35px"
        :deletable-chips="true"
      >
        <template v-slot:no-data>
          <v-list-item
            v-for="item in searchResult"
            id="layout-default__id-v-chip"
            :key="item"
          >
            <v-chip
              label
              small
              @click.native="search = item"
            >
              {{ item }}
            </v-chip>
          </v-list-item>
        </template>
      </v-combobox>
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" /> -->
      <v-spacer />
    </v-app-bar>
    <v-app-bar
      light
      style="position: relative"
      app
      color="#bcd48b"
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
      fixed: false,
      searchResult: [
        'Для дома',
        'Для сада',
        'Аксессуары',
        'Для взлома жеппы',
        'Для страданий',
        'Тупо',
        'Минус',
        'Запас',
        'Слов'
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
      x: 0,
      search: null,
      y: 0,
    }
  },
    methods: {
      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.index = index
        } else {
          this.editing = null
          this.index = -1
        }
      }
  },
  watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }

            this.items.push(v)

            this.nonce++
          }

          return v
        })
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
    background-color: white
    font-weight: 500
</style>
