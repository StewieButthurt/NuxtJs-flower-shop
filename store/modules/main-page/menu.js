const state = () => ({
    menuMainPage: [],
    menuEditPage: null
})

const mutations = {
    changeStatus(state, { status, index }) {
        state.menuMainPage[index].status = status
    },
    setMenuMainPage(state, menu) {
        state.menuMainPage = menu
    },
    setMenuEditPage(state, data) {
        state.menuEditPage = data
    }
}

const actions = {
    async changeStatus({ commit }, { status, index }) {
        commit('changeStatus', { status, index })
    },
    async setMenuMainPage({ commit }, menu) {
        commit('setMenuMainPage', menu)
    },
    async setMenuEditPage({ commit }, data) {
        commit('setMenuEditPage', data)
    }
}

const getters = {
    menuMainPage: state => state.menuMainPage,
    menuEditPage: state => state.menuEditPage
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};