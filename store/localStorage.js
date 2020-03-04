export const state = () => ({
    data: {
        title: '',
        descr: '',
        price: '',
        article: '',
        other: [],
        expire: 1
    }
})

export const mutations = {
    setTitle(state, title) {
        state.data.title = title
    },
    setDescr(state, descr) {
        state.data.descr = descr
    },
    setPrice(state, price) {
        state.data.price = price
    },
    setArticle(state, article) {
        state.data.article = article
    },
    setOtherTitle(state, info) {
        console.log(info.index)
        state.data.other[info.index].title = info.title
    },
    setOtherDescr(state, info) {
        state.data.other[info.index].descr = info.descr
    },
    setField(state, data) {
        let arr = state.data.other
        arr.push(data)
    },
    removeField(state, index) {
        let arr = state.data.other
        arr.splice(index, 1)
    },
    clearFields(state) {
        state.data.title = '',
        state.data.descr = '',
        state.data.price = '',
        state.data.article = '',
        state.data.other = []
    }
}

export const actions = {
    async setTitle({commit}, title) {
        commit('setTitle', title)
    },
    async setPrice({commit}, price) {
        commit('setPrice', price)
    },
    async setDescr({commit}, descr) {
        commit('setDescr', descr)
    },
    async setArticle({commit}, article) {
        commit('setArticle', article)
    },
    async setOtherTitle({commit}, info) {
        commit('setOtherTitle', info)
    },
    async setOtherDescr({commit}, info) {
        commit('setOtherDescr', info)
    },
    async setField({commit}, data) {
        commit('setField', data)
    },
    async removeField({commit}, index) {
        commit('removeField', index)
    },
    async clearFields({commit}, index) {
        commit('clearFields')
    },
    async addProduct({commit, state}) {
        let data = {
            title: state.data.title,
            descr: state.data.descr,
            price: state.data.price,
            article: state.data.article,
        }

        if(state.data.other.length > 0) {
            data.other = state.data.other
        }

        try {
			return await this.$axios.$post('/api/product', data)
        } catch (e) {
            throw e
        }
    },
}

export const getters = {
    title: state => state.data.title,
    descr: state => state.data.descr,
    price: state => state.data.price,
    article: state => state.data.article,
    other: state => state.data.other,
}