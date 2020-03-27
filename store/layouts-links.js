export const state = () => ({
	mainLinks: [],
    categories: []   
})

export const mutations = {
	changeStatus(state, {status, index}) {
        state.mainLinks[index].status = status
    },
    changeCategoriesStatus(state, {status, index}) {
        state.categories[index].status = status
    },
    setMainLinks(state, menu) {
        state.mainLinks = menu
    },
    setCategories(state, categories) {
        state.categories = categories
    }
}

export const actions = {
    async changeStatus({commit}, {status, index}) {
        commit('changeStatus', {status, index})
    },
    async changeCategoriesStatus({commit}, {status, index}) {
        commit('changeCategoriesStatus', {status, index})
    }
}

export const getters = {
	mainLinks: state => state.mainLinks,
	categories: state => state.categories
}