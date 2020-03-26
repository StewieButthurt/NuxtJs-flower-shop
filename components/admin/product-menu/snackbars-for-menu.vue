<template>
    <v-snackbar
        v-model="snackbar"
        multi-line
        :color="colorBckg"
        left
    >
        {{ text }}
        <v-btn
            :color="colorBtn"
            text
            @click="snackbar = false"
        >
            Закрыть
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        props: [
            'message'
        ],
        data() {
            return {
                snackbar: false,
                colorBckg: '',
                colorBtn: '',
                text: ''
            }
        },
        watch: {
            message(val) {
                if(val === 'success') {
                    this.text = 'Добавлен новый пункт меню'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                } else if(val === 'error'){
                    this.text = 'Упс! Что то пошло не так!'
                    this.colorBtn = 'white'
                    this.colorBckg = 'grey darken-4'
                    this.snackbar = true
                }
            }
        }
    }
</script>

<style lang="sass">

</style>