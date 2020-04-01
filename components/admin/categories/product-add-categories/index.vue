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
    export default {
        async mounted() {
          let items = await this.$axios.$get('/api/categories/')
          
          let arr = [];

          for(let i = 0; i < items.length; i++) {
              arr.push(items[i].title)
          }
          this.items = arr
        },
        data () {
            return {
                chips: [],
                items: [],
            }
        },
        methods: {
            remove (item) {
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
            }
        },
        watch: {
            chips(val) {
                this.$store.dispatch('add-product/setCategories', val)
            }
        }
    }
</script>

<style lang="sass">

</style>