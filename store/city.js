export const state = () => ({
	city: [],
	onCity: []
})

export const mutations = {
	setCity(state, city) {
		state.city = city
	},
	searchCity(state, data) {
		state.onCity = []
		state.onCity.push(data)
	}
}

export const actions = {
	async searchCity({commit}, data) {
		await commit('searchCity', data)
	},
	async setCity({commit}) {
        try {
			let city = await this.$axios.$get('/api/city')
			await commit('setCity', city)
        } catch (e) {
            throw e
        }
    },
	async deleteCity({commit, dispatch}, id) {
		try {
			await this.$axios.$delete('/api/city/admin/delete-city', { data: { id: id}})
		} catch (e) {
			throw e
		}
	},
	async createCity({commit}, data) {
		try {
			return await this.$axios.$post('/api/city/admin/create-city', data)
		} catch (e) {
			throw e
		}
	},
	async updateCity({commit}, data) {
		try {
			return await this.$axios.$post('/api/city/admin/update-city', data)
		} catch(e) {
			throw e
		}
	}
}

export const getters = {
	city: state => state.city,
	onCity: state => state.onCity
}