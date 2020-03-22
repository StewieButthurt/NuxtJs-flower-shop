export const state = () => ({
	mainLinks: [
        {
            title: 'Акции и скидки',
            to: '#',
            status: false
        },
        {
            title: 'Доставка и оплата',
            to: '#',
            status: false
        },
        {
            title: 'Наш полезный блог',
            to: '#',
            status: false
        },
        {
            title: 'О нас',
            to: '#',
            status: false
        },
        {
            title: 'Помощь',
            to: '#',
            status: false
        }
    ],
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