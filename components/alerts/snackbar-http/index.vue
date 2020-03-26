<template>
    <v-snackbar
        v-model="localSnackbar"
        multi-line
        :color="colorBckg"
        left
    >
        {{ text }}
        <v-btn
            :color="colorBtn"
            text
            @click="$emit('changeSnackbar', false)"
        >
            Закрыть
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        async mounted() {
            this.localSnackbar = this.snackbar
        },
        props: [
            'snackbar',
            'text',
            'colorBckg',
            'colorBtn'
        ],
        watch: {
            snackbar(val) {
                this.localSnackbar = val
            }
        },
        data() {
            return {
                localSnackbar: false
            }
        }
    }
</script>

<style lang="sass">

</style>