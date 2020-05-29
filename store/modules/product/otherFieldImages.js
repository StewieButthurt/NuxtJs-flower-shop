const state = () => ({
    otherFieldImage: []
})

const mutations = {
    addNewFieldWithImage(state, data) {
        state.otherFieldImage.push(data)
    },
    updateOtherFieldTitle(state, { title, index }) {
        state.otherFieldImage[index].title = title
    },
    setOtherFieldImage(state, { data, globalIndex }) {
        state.otherFieldImage[globalIndex].info.push(data)
    },
    updateOtherFieldImage(state, { data, index, globalIndex }) {
        // console.log(globalIndex)
        state.otherFieldImage[globalIndex].info[index].image = {
            file: data.file,
            previewImg: data.previewImg
        }
    },
    removeOtherFieldWithImageBlock(state, index) {
        state.otherFieldImage.splice(index, 1)
    },
    updateOtherFieldImageTitle(state, { title, globalIndex, index }) {
        state.otherFieldImage[globalIndex].info[index].title = title
    },
    removeOtherFieldImage(state, { index, globalIndex }) {
        state.otherFieldImage[globalIndex].info.splice(index, 1)
    },
}

const actions = {
    async updateOtherFieldImage({ commit }, { data, index, globalIndex }) {
        commit('updateOtherFieldImage', { data, index, globalIndex })
    },
    async updateOtherFieldTitle({ commit }, { title, index }) {
        commit('updateOtherFieldTitle', { title, index })
    },
    async setOtherFieldImage({ commit }, { data, globalIndex }) {
        commit('setOtherFieldImage', { data, globalIndex })
    },
    async addNewFieldWithImage({ commit }, data) {
        commit('addNewFieldWithImage', data)
    },
    async removeOtherFieldWithImageBlock({ commit }, index) {
        commit('removeOtherFieldWithImageBlock', index)
    },
    async updateOtherFieldImageTitle({ commit }, { title, globalIndex, index }) {
        commit('updateOtherFieldImageTitle', { title, globalIndex, index })
    },
    async removeOtherFieldImage({ commit }, { index, globalIndex }) {
        commit('removeOtherFieldImage', { index, globalIndex })
    }
}

const getters = {
    otherFieldImage: state => state.otherFieldImage,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};