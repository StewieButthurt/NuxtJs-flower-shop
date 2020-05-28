const state = () => ({
    sizeDiscount: '0',
    discountStatus: false
})

const mutations = {
    set(state, discount) {
        state.sizeDiscount = discount
    },
    setStatus(state, discountStatus) {
        state.discountStatus = discountStatus
    }
}

const actions = {
    set({ commit }, article) {
        commit('set', article)
    },
    setStatus({ commit }, val) {
        commit('setStatus', val)
    }
}

const getters = {
    sizeDiscount: state => state.sizeDiscount,
    discountStatus: state => state.discountStatus,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};