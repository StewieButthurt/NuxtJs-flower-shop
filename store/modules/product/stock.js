const state = () => ({
    stock: false
})

const mutations = {
    set(state, stock) {
        state.stock = stock
    },
}

const actions = {
    set({ commit }, stock) {
        commit('set', stock)
    },
}

const getters = {
    stock: state => state.stock
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};