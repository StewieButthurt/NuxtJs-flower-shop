const state = () => ({
    menu: []
})

const mutations = {
    changeStatus(state, { status, index }) {
        state.menu[index].status = status
    },
    set(state, menu) {
        state.menu = menu
    }
}

const actions = {
    async changeStatus({ commit }, { status, index }) {
        commit('changeStatus', { status, index })
    }
}

const getters = {
    menu: state => state.menu
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};