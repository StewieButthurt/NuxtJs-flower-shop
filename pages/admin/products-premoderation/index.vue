<template>
    <div>

    </div>
</template>

<script>
    export default {
        layout: 'admin',
        async validate({ store, redirect, $axios }) {
            try {
                
                if(!store.getters['modules/auth/token']) {
                    await store.dispatch('modules/auth/autoLogin')
                }

                await $axios.$get('/api/auth/admin/token')
                return true
            } catch(e) {
                redirect('/login?message=login')
            }
        },
        head: {
            title: 'Панель администратора | Премодерация товаров'
        },
    }
</script>

<style lang="sass">

</style>