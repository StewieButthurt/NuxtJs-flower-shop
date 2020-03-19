<template>
  <div class="defautl__container" v-resize="onResize">
    <v-app id="defalut-layouts" class="light default__fonts-rubik">

      <app-navigation-drawer 
        :drawer="drawer"
        :mainLinks="mainLinks"
        @changeDrawer="changeDrawer"
      />
      
      <v-app-bar
        light
        style="position: relative; display: flex; align-items: center"
        app
        id="default-header-contacts"
        color="#eaecd9"
        height="40px"
        max-height="40px"
      >
        <div class="light-green--text darken-1 subtitle-2" style="line-height: 17px">
          Ждём звонка ежедневно с 9:00 до 21:00
        </div>
        <div class="default-header-contacts__request-call">
          <div style="display: flex; align-items: center">
            <v-icon color="#97CF23" class="mr-2">mdi-phone-in-talk</v-icon>
            <span style="color: #97CF23; text-decoration: underline">+7 (977) 537-23-69</span>
          </div>
          <div style="color: #FFA800; text-decoration: underline; cursor: pointer" class="ml-5">
            Заказать звонок
          </div>
        </div>
      </v-app-bar>
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
        <div id="default__menu-settings" style="width: 100%; height: 23px; overflow: hidden">
          <app-main-links 
            v-for="(item, index) in mainLinks"
            :key="item.index"
            :title="item.title"
            :to="item.to"
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
            v-if="falseMaimLinks.length !== 0"
          >
            <template v-slot:activator="{ on }">
              <!-- <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn> -->
              <div v-on="on" class="layout-default__link-more"> >> </div>
            </template>
    
            <v-list>
              <v-list-item
                v-for="(item, index) in falseMaimLinks"
                :key="index"
                @click="$router.push(item.to)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>
      <v-app-bar
        light
        style="position: relative"
        id="default-header-search"
        height="80px"
        max-height="80px"
        app
        flat
        color="white"
      >
        <v-btn
          color="#97CF23"
          class="white--text"
        >
          <v-icon class="mr-2" right dark>mdi-format-list-bulleted</v-icon>
          Каталог
        </v-btn>
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
      </v-app-bar>
      <v-app-bar
        app
        style="position: relative"
        color="#83ae26"
        id="layout-default__v-app-bar"
        height="64px"
        max-height="64px"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <nuxt-link class="layout-default__link ml-10" no-prefetch to="/">
          Каталог товаров
        </nuxt-link>
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
  </div>
</template>

<script>

const AppMainLinks = () => import('~/components/layouts/main-links.vue')
const AppNavigationDrawer = () => import('~/components/layouts/default/navigation-drawer/index.vue')

export default {
  data () {
    return {
      globalIndex: false,
      drawer: false,
      select: '',
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
      statusMenu: true,
      search: null,
      windowSize: {
          x: 0,
          y: 0
      }
    }
  },
  methods: {
    changeIndex(index) {
      this.globalIndex = index
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    async changeDrawer(drawer) {
      this.drawer = drawer
    }
  },
  async mounted() {
    this.onResize()
  },
  components: {
    AppMainLinks,
    AppNavigationDrawer
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
    },
    mainLinks() {
      return this.$store.getters['layouts-links/mainLinks']
    },
    falseMaimLinks() {
      let arr = [];
      for(let i = 0; i < this.mainLinks.length; i++) {
        if(this.mainLinks[i].status === false) {
          arr.push(this.mainLinks[i])
        }
      }

      return arr
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
  .defautl__container
    margin: 0 auto
    width: 100%
    max-width: 1920px

  #defalut-layouts .layout-default__link
    text-decoration: none 
    text-transform: uppercase
    font-size: 14px
    color: black
    position: relative
  
  #defalut-layouts .layout-default__combox-search
    max-width: 300px
  
  #defalut-layouts .layout-default__combox-search .v-input__control
    height: 40px
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
  
  #default-header-contacts .v-toolbar__content
    justify-content: space-between
    width: 100%
    padding: 4px 50px
    margin: 0 auto
    +md-block
      padding: 4px 20px
  
  .default__fonts-rubik
    font-family: 'Rubik-Regular', sans-serif
    font-weight: 400
  
  .default-header-contacts__request-call
    display: flex
    +sm-block
      display: none
    
  #default-header-logo-links .v-toolbar__content
    width: 100%
    padding: 4px 50px
    margin: 0 auto
    +md-block
      padding: 4px 55px 4px 20px
  
  .default__logo
    height: 60px
    width: 190px
    min-width: 190px
    margin-right: 45px
    background-color: #FA7E7E
    display: flex
    justify-content: center
    align-items: center
  
  #default-header-logo-links .layout-default__link-hover 
    color: #7CAA1A
    border-bottom: 2px solid #FFA800
  
  #default-header-logo-links .layout-default__link-active
    color: #FFA800
  
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
  
  #default-header-search .v-toolbar__content
    padding: 4px 60px 4px 70px
    +md-block
      padding: 4px 35px 
  
  #default-header-search .v-btn:not(.v-btn--round).v-size--default
    padding: 0px 10px 0px 2px

</style>
