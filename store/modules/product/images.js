const state = () => ({
    images: [{
        file: false,
        previewImg: false,
        token: `${Math.random()}`
    }]
})

const mutations = {
    setImages(state, index) {
        state.images.splice(index, 1)
    },
    setImageField(state, data) {
        let arr = state.images
        arr.push(data)
    },
    removeImageField(state, index) {
        let arr = state.images
        arr.splice(index, 1)
    },
    imagesFilter(state) {
        for (let i = 0; i < state.images.length; i++) {
            if (!state.images[i].previewImg) {
                state.images.splice(i, 1)
            }
        }
    },
    updateDataImage(state, data) {
        state.images.splice(data.index, 1, data.data)
    },
}

const actions = {
    async setImages({ commit }, index) {
        commit('setImages', index)
    },
    async removeImageField({ commit }, index) {
        commit('removeImageField', index)
    },
    async imagesFilter({ commit }) {
        commit('imagesFilter')
    },
    async updateDataImage({ commit }, data) {
        commit('updateDataImage', data)
    },
    async setImageField({ commit }, data) {
        commit('setImageField', data)
    },
}

const getters = {
    images: state => state.images,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};