const state = () => ({
    other: []
})

const mutations = {
    setField(state, data) {
        let arr = state.other
        arr.push(data)
    },
    setOtherTitle(state, info) {
        state.other[info.index].title = info.title
    },
    setOtherDescr(state, info) {
        state.other[info.index].descr = info.descr
    },
    removeField(state, index) {
        let arr = state.other
        arr.splice(index, 1)
    },
}

const actions = {
    async setField({ commit }, data) {
        commit('setField', data)
    },
    async setOtherTitle({ commit }, info) {
        commit('setOtherTitle', info)
    },
    async setOtherDescr({ commit }, info) {
        commit('setOtherDescr', info)
    },
    async removeField({ commit }, index) {
        commit('removeField', index)
    },
}

const getters = {
    other: state => state.other,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};