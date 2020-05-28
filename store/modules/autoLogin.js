const state = () => ({
    error: null
})

const mutations = {
    setError(state, error) {
        state.error = error.response.data.message
    },
    clearError(state) {
        state.error = null
    }
}

const actions = {
    nuxtServerInit({ dispatch }) {
        dispatch('auth/autoLogin')
    }
}

const getters = {
    error: state => state.error
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};