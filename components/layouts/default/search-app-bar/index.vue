<template>
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
</template>

<script>
    export default {
        data() {
            return {
                select: '',
                statusMenu: true,
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
                search: null
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
        }
    }
</script>

<style lang="sass">

    #default-header-search .v-toolbar__content
        padding: 4px 60px 4px 70px
        +md-block
            padding: 4px 35px 
  
    #default-header-search .v-btn:not(.v-btn--round).v-size--default
        padding: 0px 10px 0px 10px
    
    #defalut-layouts .layout-default__combox-search
        max-width: 300px
  
    #defalut-layouts .layout-default__combox-search .v-input__control
        height: 40px
        min-height: 0px
    
    #defalut-layouts .layout-default__combox-search .v-input__slot
        margin-bottom: 0px
    
    #defalut-layouts .layout-default__combox-search .v-input__append-inner
        display: none

</style>