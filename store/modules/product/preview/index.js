const state = () => ({
    progressValue: 0,
    checkErrorForm: null,
    checkErrorImage: null,
    overlay: false
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
    }
}

const actions = {
    async resetNotifications({ commit, dispatch }, data) {
        await dispatch('modules/alert/snackbar/setMessage', data.message)
        await dispatch('modules/alert/snackbar/setSnackbar', data.snackbar)
        await commit('setProgressValue', data.progressValue)
        await commit('setCheckErrorForm', data.checkErrorForm)
        await commit('setCheckErrorImage', data.checkErrorImage)
    },
    async setOverlayChange({ commit }, value) {
        commit('overlayChange', value)
    },
    async setProgressValue({ commit }, value) {
        commit('setProgressValue', value)
    },
    async setCheckErrorForm({ commit }, value) {
        commit('setCheckErrorForm', value)
    }
}

const getters = {
    progressValue: state => state.progressValue,
    checkErrorForm: state => state.checkErrorForm,
    checkErrorImage: state => state.checkErrorImage,
    overlay: state => state.overlay
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};