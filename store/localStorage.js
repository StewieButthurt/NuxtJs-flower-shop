export const state = () => ({
    data: {
        title: '',
        descr: '',
        id: '',
        expire: 1
    }
})

export const mutations = {
    setTitle(state, title) {
        state.data.title = title
    },
    setDescr(state, descr) {
        state.data.descr = descr
    },
    setId(state, id) {
        state.data.id = id
    }
}

export const actions = {
    async setTitle({commit}, title) {
        commit('setTitle', title)
    },
    async setDescr({commit}, descr) {
        commit('setDescr', descr)
    },
    async setId({commit}, id) {
        commit('setId', id)
    }
}

export const getters = {
    title: state => state.data.title,
    descr: state => state.data.descr,
    id: state => state.data.id
}