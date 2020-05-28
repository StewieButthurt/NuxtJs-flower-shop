const state = () => ({
    weekPrice: false
})

const mutations = {
    set(state, weekPrice) {
        state.weekPrice = weekPrice
    },
}

const actions = {
    set({ commit }, weekPrice) {
        commit('set', weekPrice)
    },
}

const getters = {
    weekPrice: state => state.weekPrice,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};