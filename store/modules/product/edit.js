const state = () => ({
    id: '',

})

const mutations = {
    setId(state, id) {
        state.id = id
    }
}

const actions = {
    async setId({ commit }, id) {
        commit('setId', id)
    }
}

const getters = {
    id: state => state.id
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};