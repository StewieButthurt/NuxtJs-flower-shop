const state = () => ({
    categories: []
})

const mutations = {
    set(state, value) {
        state.categories = value
    },
    remove(state, value) {
        state.categories.splice(state.categories.indexOf(value), 1)
    },
}

const actions = {
    set({ commit }, value) {
        commit('set', value)
    },
    remove({ commit }, value) {
        commit('remove', value)
    },
}

const getters = {
    categories: state => state.categories
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};