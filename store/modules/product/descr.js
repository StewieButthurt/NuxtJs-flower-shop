const state = () => ({
    descr: ''
})

const mutations = {
    set(state, descr) {
        state.descr = descr
    },
}

const actions = {
    set({ commit }, descr) {
        commit('set', descr)
    },
}

const getters = {
    descr: state => state.descr
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};