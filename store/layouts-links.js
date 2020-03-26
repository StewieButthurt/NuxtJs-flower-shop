export const state = () => ({
	mainLinks: [],
    categories: [
        {
            title: 'Уход за растениями',
            to: "#",
            status: false
        },
        {
            title: 'Инструмент и инвентарь',
            to: "#",
            status: false
        },
        {
            title: 'Наши услуги',
            to: "#",
            status: false
        },
        {
            title: 'Садовая техника',
            to: "#",
            status: false
        },
        {
            title: 'Садовый декор',
            to: "#",
            status: false
        },
        {
            title: 'Саженцы',
            to: "#",
            status: false
        },
        {
            title: 'Биопрепараты',
            to: "#",
            status: false
        },
        {
            title: 'Инструмент и инвентарь',
            to: "#",
            status: false
        },
        {
            title: 'Инструмент и инвентарь',
            to: "#",
            status: false
        },
        {
            title: 'инструмент и инвентарь',
            to: "#",
            status: false
        }
    ]   
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