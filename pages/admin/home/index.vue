<template>
    <div class="admin-home">
        <div class="admin-home__tile">
            Welcome to Admin Panel!
        </div>
    </div>
</template>

<script>
    export default {
        async validate({ store, redirect, $axios }) {
            try {
                await $axios.$get('/api/auth/admin/token')
                return true
            } catch(e) {
                redirect('/login?message=login')
            }
        },
        layout: 'admin',
        head: {
            title: 'Панель администратора | Главная'
        }
    }
</script>

<style lang="sass">
    .admin-home
        padding-left: 20px
    .admin-home__tile
        padding-top: 20px
        font-size: 24px
</style>