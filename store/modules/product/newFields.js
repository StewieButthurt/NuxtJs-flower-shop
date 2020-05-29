const state = () => ({
    newFields: []
})

const mutations = {
    setNewFields(state, data) {
        let arr = state.newFields
        arr.push(data)
    },
    updateNewFieldDescr(state, info) {
        state.newFields[info.index].descr = info.descr
    },
    updateNewFieldTitle(state, data) {
        state.newFields[data.index].title = data.title
    },
    removeNewField(state, index) {
        let arr = state.newFields
        arr.splice(index, 1)
    },
}

const actions = {
    async setNewFields({ commit }, data) {
        commit('setNewFields', data)
    },
    async updateNewFieldDescr({ commit }, info) {
        commit('updateNewFieldDescr', info)
    },
    async updateNewFieldTitle({ commit }, data) {
        commit('updateNewFieldTitle', data)
    },
    async removeNewField({ commit }, index) {
        commit('removeNewField', index)
    },
}

const getters = {
    newFields: state => state.newFields,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};