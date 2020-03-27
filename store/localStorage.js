export const state = () => ({
    menu: {
        title: '',
        link: '',
        id: '',
        expire: 1
    },
    categories: {
        title: '',
        id: '',
        expire: 1
    }
})

export const mutations = {
    setMenu(state, data) {
        state.menu.title = data.title
        state.menu.link = data.link
        state.menu.id = data.id
    },
    setCategories(state, data) {
        state.categories.title = data.title
        state.categories.id = data.id
    }
}

export const actions = {
    async setMenu({commit}, data) {
        commit('setMenu', data)
    },
    async setCategories({commit}, data) {
        commit('setCategories', data)
    }
}

export const getters = {
    menu: state => state.menu,
    categories: state => state.categories
}