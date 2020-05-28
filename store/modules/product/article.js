const state = () => ({
    article: ''
})

const mutations = {
    set(state, article) {
        state.article = article
    },
}

const actions = {
    set({ commit }, article) {
        commit('set', article)
    },
}

const getters = {
    article: state => state.article
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};