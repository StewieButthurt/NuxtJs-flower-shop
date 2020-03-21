<template>
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
</template>

<script>
    export default {
        
    }
</script>

<style lang="sass">

    #default-header-contacts .v-toolbar__content
        justify-content: space-between
        width: 100%
        padding: 4px 50px
        margin: 0 auto
        +md-block
          padding: 4px 20px
    
    .default-header-contacts__request-call
        display: flex
        +sm-block
          display: none
</style>