const state = () => ({
    product: null

})

const mutations = {
    setProduct(state, product) {
        state.product = product
    }
}

const actions = {
    async setProduct({ commit }, product) {
        commit('setProduct', product)
    }
}

const getters = {
    product: state => state.product
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};