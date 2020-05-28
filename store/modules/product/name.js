const state = () => ({
    name: ''
})

const mutations = {
    set(state, name) {
        state.name = name
    },
}

const actions = {
    set({ commit }, name) {
        commit('set', name)
    }
}

const getters = {
    name: state => state.name,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};