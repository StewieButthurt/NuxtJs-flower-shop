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
            title: 'Наш полезный блог',
            to: '#',
            status: false
        },
        {
            title: 'Наш полезный блог',
            to: '#',
            status: false
        },
        {
            title: 'Наш полезный блог',
            to: '#',
            status: false
        },
        {
            title: 'Наш полезный блог',
            to: '#',
            status: false
        },
        {
            title: 'Наш полезный блог',
            to: '#',
            status: false
        },
        {
            title: 'Наш полезный блог',
            to: '#',
            status: false
        },
        {
            title: 'Помощь',
            to: '#',
            status: false
        },
        {
            title: 'Помощь',
            to: '#',
            status: false
        },
        {
            title: 'Помощь',
            to: '#',
            status: false
        },
        {
            title: 'Помощь',
            to: '#',
            status: false
        },
        {
            title: 'Помощь',
            to: '#',
            status: false
        },
        {
            title: 'Помощь',
            to: '#',
            status: false
        },
        {
            title: 'Помощь',
            to: '#',
            status: false
        }
    ]
})

export const mutations = {
	changeStatus(state, {status, index}) {
        state.mainLinks[index].status = status
    }
}

export const actions = {
    async changeStatus({commit}, {status, index}) {
        commit('changeStatus', {status, index})
    }
}

export const getters = {
	mainLinks: state => state.mainLinks
}