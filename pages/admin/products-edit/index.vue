<template>
    <div class="products-edit" id="products-edit">
        <v-container fluid align-center>
            <v-row>
                <v-col>
                    <div class="font-weight-bold title text-center">
                        Поиск товара для редактирования
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                    <v-autocomplete
                        v-model="select"
                        style="max-width: 400px"
                        :items="searchResult"
                        class="layout-default__combox-search mt-5"
                        :search-input.sync="search"
                        :menu-props="{value: disabledMenu}"
                        item-text="name"
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
                    </v-autocomplete>
                </v-col>

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
                searchResult: [],
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
                // this.searchResult = []
                if(val && val.length > 1) {
                   await this.$axios.$get('/api/product/get-product-search', { params: { search: val } })
                        .then(async function (response) {

                                if(response.name.length !== 0) {

                                    vm.searchResult.push({header: 'Товары'})

                                    for(let i = 0; i < response.name.length; i++) {

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

                                if(response.article.length !== 0) {
                                    for(let i = 0; i < response.article.length; i++) {

                                        let group = [];

                                        for(let k = 0; k < response.article[i].categories.length; k++) {
                                            group.push(` ${response.article[i].categories[k]}`)
                                        }

                                        vm.searchResult.push({
                                            name: `${response.article[i].name}, ${response.article[i].article}`,
                                            group: `${group}`,
                                            avatar: require('~/assets/' + response.article[i].images[0].previewImg)
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
            },
            select(val) {
                console.log(val)
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
    
    #inspire .v-menu__content 
        max-width: 400px
    
</style>