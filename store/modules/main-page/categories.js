const state = () => ({
    categories: []
})

const mutations = {
    changeStatus(state, { status, index }) {
        state.categories[index].status = status
    },
    set(state, categories) {
        state.categories = categories
    }
}

const actions = {
    async changeStatus({ commit }, { status, index }) {
        commit('changeStatus', { status, index })
    }
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