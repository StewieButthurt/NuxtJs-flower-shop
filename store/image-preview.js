import api from './idb/image-preview.js'

export const state = () => ({
	images: []
})

export const mutations = {
	setImage(state, images) {
		state.images = images
	}
}

export const actions = {
	async getImage({commit}) {
        try {
            let images = await api.getImage()
			commit('setImage', images)
        } catch (e) {
            throw e
        }
	},
	async setDataImage({commit}, data) {
		try {
			await api.saveImage(data)
		} catch(e) {
			throw e
		}
	},
	async updateDataImage({commit}, data) {
		try {
			await api.updateImage(data)
		} catch(e) {

		}
	},
	async deleteImage({commit}, index) {
		try {
			await api.deleteImage(index)
		} catch(e) {
			throw e
		}
	}
}

export const getters = {
	images: state => state.images
}