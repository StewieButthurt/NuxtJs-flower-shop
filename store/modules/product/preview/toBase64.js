const state = () => ({
    status: true,
    image: null
})

const mutations = {
    setImage(state, image) {
        state.image = image
    }
}

const actions = {
    async toBase64({ commit }, buffer) {

        const readerPreview = new FileReader();

        readerPreview.onload = function(e) {
            commit('setImage', e.target.result)
        }

        readerPreview.readAsDataURL(buffer);

    }
}

const getters = {
    status: state => state.status,
    image: state => state.image
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};