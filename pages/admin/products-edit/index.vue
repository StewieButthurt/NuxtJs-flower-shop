<template>
    <div class="products-edit" id="products-edit">
        <v-container fluid align-center>
            <v-row>
                <v-col>
                    <div class="font-weight-bold title text-center">
                        Поиск по артиклу
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-combobox
                    v-model="select"
                    :items="searchResult"
                    class="layout-default__combox-search mt-5"
                    :search-input.sync="search"
                    :menu-props="{value: disabledMenu}"
                    item-text="name"
                    item-value="name"
                    outlined
                    color="black"
                    dense
                    solo
                    eager
                    flat
                    chips
                    no-data-text="Совпадения не найдены"
                    small-chips
                    label="Поиск товаров..."
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
                </v-combobox>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        head: {
            title: 'Панель администратора | Редактирование товара'
        },
        data() {
            return {
                select: '',
                searchResult: [
                    {header: 'Категории'}, 
                    {name: 'Для дома', group: 'Категории', avatar: require('~/assets/1.png')},
                    {name: 'Для сада', group: 'Категории', avatar: require('~/assets/1.png')},
                    {name: 'Аксессуары', group: 'Категории', avatar: require('~/assets/1.png')},
                    { divider: true },
                    { header: 'Товары' },
                    {name: 'Саженцы', group: 'Товары', avatar: require('~/assets/1.png')}
                    
                ],
                search: null,
                statusMenu: true
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
        },
        watch: {
            async search (val) {
                let vm = this
                this.searchResult = []
                if(val && val.length > 1) {
                   await this.$axios.$get('/api/product/get-product-search', { params: { search: val } })
                        .then(async function (response) {
                                console.log(response.name.length)
                                if(response.name.length !== 0) {
                                    console.log(1)
                                    vm.searchResult.push({header: 'Товары'})
                                    for(let i = 0; i < response.name.length; i++) {

                                        console.log(2)

                                        let group = [];

                                        for(let k = 0; k < response.name[i].categories.length; k++) {
                                            group.push(` ${response.name[i].categories[k]}`)
                                        }

                                        vm.searchResult.push({
                                            name: `${response.name[i].name}, ${response.name[i].article}`,
                                            group: `${group}`,
                                            avatar: require('~/assets/' + response.name[i].images[0].previewImg)
                                        })
                                    }
                                }
                                
                        })
                        .catch(function (error) {
                            
                            
                            console.log(error);
                            throw error
                        })
                } else {
                    this.search = null
                }
            }
        }
    }
</script>

<style lang="sass">
    
    #products-edit .layout-default__combox-search
        max-width: 400px
        margin-left: 0px
        +xs-block
          margin-left: 0px
          max-width: 100%
    
    #products-edit fieldset
        border: 1px solid currentColor
        
    // #products-edit .layout-default__combox-search .v-input__control
    //     height: 40px
    //     min-height: 0px
    
    // #products-edit .layout-default__combox-search .v-input__slot
    //     margin-bottom: 0px
    
    // #products-edit .layout-default__combox-search .v-input__append-inner
    //     display: none
      
    // #products-edit .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset
    //     color: black
    //     border-width: 1px
    //     border-radius: 0px
    
    // #products-edit .v-input__slot
    //     border-radius: 0px
    
    // #products-edit .search-app-bar__button-link
    //   text-decoration: none
    //   color: black
    
    // #products-edit .search-app-bar__button-link:hover
    //   color: black
    
</style>