const state = () => ({
    message: false,
    snackbar: false,
    text: '',
    colorBckg: '',
    colorBtn: ''
})

const mutations = {
    setMessage(state, message) {
        state.message = message
    },
    setSnackbar(state, snackbar) {
        state.snackbar = snackbar
    },
    setText(state, text) {
        state.text = text
    },
    setColorBckg(state, colorBckg) {
        state.colorBckg = colorBckg
    },
    setColorBtn(state, colorBtn) {
        state.colorBtn = colorBtn
    },
}

const actions = {
    async setMessage({ commit }, message) {
        commit('setMessage', message)
    },
    async setSnackbar({ commit }, snackbar) {
        commit('setSnackbar', snackbar)
    },
    async setText({ commit }, text) {
        commit('setText', text)
    },
    async setColorBckg({ commit }, colorBckg) {
        commit('setColorBckg', colorBckg)
    },
    async setColorBtn({ commit }, colorBtn) {
        commit('setColorBtn', colorBtn)
    }
}

const getters = {
    message: state => state.message,
    snackbar: state => state.snackbar,
    text: state => state.text,
    colorBckg: state => state.colorBckg,
    colorBtn: state => state.colorBtn
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};