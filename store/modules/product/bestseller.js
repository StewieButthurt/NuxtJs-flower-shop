const state = () => ({
    bestseller: false
})

const mutations = {
    set(state, bestseller) {
        state.bestseller = bestseller
    },
}

const actions = {
    set({ commit }, bestseller) {
        commit('set', bestseller)
    },
}

const getters = {
    bestseller: state => state.bestseller,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};