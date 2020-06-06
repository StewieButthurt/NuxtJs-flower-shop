const state = () => ({

})

const mutations = {

}

const actions = {
    async sendForm({ commit, dispatch }, fields) {

        // change loading bar value
        await dispatch('modules/product/preview/setProgressValue', 40)

        //change message status
        await dispatch('modules/alert/snackbar/setMessage',
            'Загрузка основных данных...'
        )

        const responseFields = await this.$axios
            .$post('/api/product/create/fields', fields)

        await dispatch('modules/alert/snackbar/setMessage',
            responseFields.message
        )

        if (responseFields.error === 'true') {

            await dispatch('modules/product/preview/setCheckErrorForm', true)

            setTimeout(() => {
                vm.$emit('overlayOffError')
            }, 1000);

            return false
        } else {
            this.$emit('changeCheckErrorForm', false)
            let id = responseFields.product._id
            return id
        }
    }
}

const getters = {

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};