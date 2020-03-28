<template>
    <v-dialog
        v-model="localDialog"
        max-width="300"
      >
        <v-card>
          <v-card-title class="subtitle-1">{{dialogText}}</v-card-title>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              color="green darken-1"
              text
              @click="disagree()"
            >
              Отменить
            </v-btn>
  
            <v-btn
              color="green darken-1"
              text
              @click="agree()"
            >
              Ок
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                localDialog: false
            }
        },
        props: [
            'dialog',
            'dialogText'
        ],
        watch: {
            dialog(val) {
                this.localDialog = val
            }
        },
        async mounted() {
            this.localDialog = this.dialog
        },
        methods: {
            async disagree() {
                this.$emit('changeDialog', {
                    status: false
                })
            },
            async agree() {
                this.$emit('changeDialog', {
                    status: true
                })
            }
        }
    }
</script>

<style lang="sass">

</style>