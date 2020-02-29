<template>
    
</template>

<script>
    export default {
        layout: 'admin',
        async validate({ store, redirect, $axios }) {
            try {
                await $axios.$get('/api/auth/admin/token')
                return true
            } catch(e) {
                redirect('/login?message=login')
            }
        },
        created() {
            this.$router.push('/admin/home/')
        }
    }
</script>

<style lang="sass">
    
</style>