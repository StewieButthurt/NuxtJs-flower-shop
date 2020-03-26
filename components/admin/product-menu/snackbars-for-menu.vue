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
                colorBtn: ''
            }
        },
        computed: {
            text() {
                if(this.message === 'success') {
                    return 'Пункт меню добавлен'
                } else if(this.message === 'error') {
                    return 'Ой! Ошибка! Попробуйте снова!'
                } else {
                    return 'Упс! Что то пошло не так!'
                }
            }
        },
        watch: {
            message(val) {
                if(val === 'success') {
                    this.colorBtn = 'white'
                    this.colorBckg = 'green darken-4'
                    this.snackbar = true
                } else {
                    this.colorBtn = 'white'
                    this.colorBckg = 'error'
                    this.snackbar = true
                }
            }
        }
    }
</script>

<style lang="sass">

</style>