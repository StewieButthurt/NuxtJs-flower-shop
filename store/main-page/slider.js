export const state = () => ({
	slides: [
        {
            src: 'slider.png',
        },
        {
            src: 'slider.png',
        },
        {
            src: 'slider.png',
        },
        {
            src: 'slider.png',
        },
    ]
})

export const mutations = {
	setCity(state, city) {
		state.city = city
	}
}

export const actions = {
	async updateCity({commit}, data) {
		try {
			return await this.$axios.$post('/api/city/admin/update-city', data)
		} catch(e) {
			throw e
		}
	}
}

export const getters = {
	slides: state => state.slides
}