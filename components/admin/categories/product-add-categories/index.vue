<template>
    <v-combobox
      v-model="chips"
      :items="items"
      chips
      clearable
      label="Выберете категорию или добавьте новую"
      multiple
      prepend-icon="mdi-format-list-bulleted-square"
      solo
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <strong>{{item}}</strong>&nbsp;
        </v-chip>
      </template>
    </v-combobox>
</template>

<script>
    const getCategoriesStore = () => import('~/store/modules/product/categories.js')

    export default {
        async mounted() {
          if(!this.$store.getters['modules/product/categories/categories']) {
            await this.$store.registerModule('categories', getCategoriesStore)
          }
          
          let items = await this.$axios.$get('/api/categories/')
          
          let arr = [];

          for(let i = 0; i < items.length; i++) {
              arr.push(items[i].title)
          }
          this.items = arr

          this.chips = this.getCategories
        },
        data () {
            return {
                chips: [],
                items: []
            }
        },
        methods: {
            async remove (item) {
              await this.$store.dispatch('modules/product/categories/remove', item)
              this.chips = this.getCategories
            }
        },
        watch: {
            chips(val) {
                this.$store.dispatch('modules/product/categories/set', val)
            }
        },
        computed: {
          getCategories() {
            return this.$store.getters['modules/product/categories/categories']
          }
        }
    }
</script>

<style lang="sass">

</style>