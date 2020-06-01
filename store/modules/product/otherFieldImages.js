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
    updateOtherFieldImage(state, { data, index, globalIndex, commit }) {

        state.otherFieldImage[globalIndex].info[index].image = {
            file: data.file,
            previewImg: data.previewImg
        }

        commit('checkOtherFieldImage', { globalIndex })


    },
    removeOtherFieldWithImageBlock(state, index) {
        state.otherFieldImage.splice(index, 1)
    },
    updateOtherFieldImageTitle(state, { title, globalIndex, index }) {
        state.otherFieldImage[globalIndex].info[index].title = title
    },
    removeOtherFieldImage(state, { index, globalIndex, commit }) {
        state.otherFieldImage[globalIndex].info.splice(index, 1)

        commit('checkOtherFieldImage', { globalIndex })
    },
    checkOtherFieldImage(state, { globalIndex }) {
        let counter = 0

        for (let i = 0; i < state.otherFieldImage[globalIndex].info.length; i++) {
            if (state.otherFieldImage[globalIndex].info[i].image.previewImg) {
                counter++
            }
        }

        if (state.otherFieldImage[globalIndex].info.length === counter) {


            let dataLocal = {
                title: '',
                image: {
                    file: null,
                    previewImg: null
                },
                token: `${Math.random()}`
            }
            state.otherFieldImage[globalIndex].info.push(dataLocal)

        }
    }
}

const actions = {
    async updateOtherFieldImage({ commit }, { data, index, globalIndex }) {
        commit('updateOtherFieldImage', { data, index, globalIndex, commit })
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
        commit('removeOtherFieldImage', { index, globalIndex, commit })
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