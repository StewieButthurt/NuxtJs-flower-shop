const state = () => ({
    progressValue: 0,
    checkErrorForm: null,
    checkErrorImage: null,
    overlay: false,
    messageStatus: 'Начало загрузки...',
    counterImage: 0
})

const mutations = {
    setProgressValue(state, value) {
        state.progressValue = value
    },
    setCheckErrorForm(state, value) {
        state.checkErrorForm = value
    },
    setCheckErrorImage(state, value) {
        state.setCheckErrorImage = value
    },
    setOverlayChange(state, value) {
        state.overlay = value
    },
    setMessageStatus(state, value) {
        state.messageStatus = value
    },
    setCounterImage(state, value) {
        state.counterImage = value
    },
    counterImageIncrement(state) {
        state.counterImage++
    }
}

const actions = {
    async resetNotifications({ commit, dispatch }, data) {
        await dispatch('modules/alert/snackbar/setMessage', false, { root: true })
        await dispatch('modules/alert/snackbar/setSnackbar', false, { root: true })
        await commit('setProgressValue', 0)
        await commit('setCheckErrorForm', null)
        await commit('setCheckErrorImage', null)
    },
    async setOverlayChange({ commit }, value) {
        commit('setOverlayChange', value)
    },
    async setProgressValue({ commit }, value) {
        commit('setProgressValue', value)
    },
    async setCheckErrorForm({ commit }, value) {
        commit('setCheckErrorForm', value)
    },
    async setCheckErrorImage({ commit }, value) {
        commit('setCheckErrorImage', value)
    },
    async setMessageStatus({ commit }, value) {
        commit('setMessageStatus', value)
    },
    async setCounterImage({ commit }, value) {
        commit('setCounterImage', value)
    },
    async counterImageIncrement({ commit }) {
        commit('counterImageIncrement')
    }
}

const getters = {
    progressValue: state => state.progressValue,
    checkErrorForm: state => state.checkErrorForm,
    checkErrorImage: state => state.checkErrorImage,
    overlay: state => state.overlay,
    messageStatus: state => state.messageStatus,
    counterImage: state => state.counterImage
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};