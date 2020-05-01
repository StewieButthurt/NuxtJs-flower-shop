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
    },
    productEdit: {
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
    },
    setProductEdit(state, data) {
        state.productEdit.id = data
    }
}

export const actions = {
    async setMenu({ commit }, data) {
        commit('setMenu', data)
    },
    async setCategories({ commit }, data) {
        commit('setCategories', data)
    },
    async setProductEdit({ commit }, data) {
        commit('setProductEdit', data)
    }
}

export const getters = {
    menu: state => state.menu,
    categories: state => state.categories,
    productEdit: state => state.productEdit.id
}