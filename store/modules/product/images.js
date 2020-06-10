const state = () => ({
    images: [{
        file: false,
        previewImg: false,
        token: `${Math.random()}`
    }]
})

const mutations = {
    setImages(state, { index, commit }) {
        state.images.splice(index, 1)

        commit('checkImages')
    },
    setImageField(state, data) {
        let arr = state.images
        arr.push(data)
    },
    removeImageField(state, { index, commit }) {
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
    updateDataImage(state, { data, commit }) {
        state.images.splice(data.index, 1, data.data)

        commit('checkImages')
    },
    checkImages(state) {

        let counter = 0

        for (let i = 0; i < state.images.length; i++) {
            if (state.images[i].previewImg) {
                counter++
            }
        }

        if (state.images.length === counter) {
            state.images.push({
                file: false,
                previewImg: false,
                token: `${Math.random()}`
            })
        }
    }
}

const actions = {
    async setImages({ commit }, index) {
        commit('setImages', { index, commit })
    },
    async removeImageField({ commit }, index) {
        commit('removeImageField', { index, commit })
    },
    async imagesFilter({ commit }) {
        commit('imagesFilter')
    },
    async updateDataImage({ commit }, data) {
        commit('updateDataImage', { data, commit })
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