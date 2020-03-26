<template>
    <v-snackbar
        v-model="snackbar"
        multi-line
        :color="changeColor"
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
                colorBtn: 'red'
            }
        },
        computed: {
            changeColor() {
                if(this.message === 'success') {
                    return 'green darken-4'
                } else {
                    return 'error'
                }
            },
            text() {
                if(this.message === 'success') {
                    return 'Новый пользователь добавлен'
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
                    this.snackbar = true
                } else {
                    this.snackbar = true
                    this.colorBtn = 'white'
                }
            }
        }
    }
</script>

<style lang="sass">

</style>