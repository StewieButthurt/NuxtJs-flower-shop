const state = () => ({
    price: ''
})

const mutations = {
    set(state, price) {
        state.price = price
    },
}

const actions = {
    set({ commit }, price) {
        commit('set', price)
    },
}

const getters = {
    price: state => state.price,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};