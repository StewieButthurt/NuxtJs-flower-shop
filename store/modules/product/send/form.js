const state = () => ({
    status: true
})

const mutations = {

}

const actions = {
    async sendForm({ commit, dispatch }, fields) {

        //change message status
        await dispatch('modules/product/preview/main/setMessageStatus',
            'Загрузка основных данных...', { root: true }
        )

        // change loading bar value
        await dispatch('modules/product/preview/main/setProgressValue',
            40, { root: true })


        try {
            const responseFields = await this.$axios
                .$post('/api/product/create/fields', fields)

            await dispatch('modules/product/preview/main/setMessageStatus',
                responseFields.message, { root: true }
            )

            if (responseFields.error === 'true') {

                await dispatch('modules/product/preview/main/setCheckErrorForm',
                    true, { root: true })

                setTimeout(async function() {
                    await dispatch('modules/product/preview/main/setOverlayChange',
                        false, { root: true })
                }, 1000);

                return false

            } else {

                await dispatch('modules/product/preview/main/setCheckErrorForm',
                    false, { root: true })
                let id = responseFields.product._id
                console.log('id after fields request', responseFields.product._id)
                return id
            }
        } catch (e) {
            console.error('Error: Упс! Что то пошло не так!', e)

            await dispatch('modules/product/preview/main/setMessageStatus',
                'Упс! Что то пошло не так!', { root: true }
            )

            setTimeout(async function() {
                await dispatch('modules/product/preview/main/setOverlayChange',
                    false, { root: true })
            }, 1000);
        }


    }
}

const getters = {
    status: state => state.status
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};