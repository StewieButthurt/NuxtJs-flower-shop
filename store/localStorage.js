export const state = () => ({
    menu: {
        title: '',
        link: '',
        id: '',
        expire: 1
    }
})

export const mutations = {
    setMenu(state, data) {
        state.menu.title = data.title
        state.menu.link = data.link
        state.menu.id = data.id
    }
}

export const actions = {
    async setMenu({commit}, data) {
        commit('setMenu', data)
    }
}

export const getters = {
    menu: state => state.menu
}