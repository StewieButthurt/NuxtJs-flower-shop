import Vue from 'vue'

export const state = () => ({
    data: {
        other: [],
        newFields: [],
    }
})

export const mutations = {
    setOtherTitle(state, info) {
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
        state.data.name = '',
            state.data.descr = '',
            state.data.price = '',
            state.data.article = '',
            state.data.newFields = [],
            state.data.other = [],
            this.discountStatus = false,
            this.sizeDiscount = '0'
        state.data.images = [{
            file: false,
            previewImg: false,
            token: `${Math.random()}`
        }]
    },
    setData(state, data) {
        state.data = data
    }
}

export const actions = {
    async setData({ commit }, data) {
        commit('setData', data)
    },
    async setDiscount({ commit }, discount) {
        commit('setDiscount', discount)
    },
    async setOtherTitle({ commit }, info) {
        commit('setOtherTitle', info)
    },
    async setOtherDescr({ commit }, info) {
        commit('setOtherDescr', info)
    },
    async setField({ commit }, data) {
        commit('setField', data)
    },
    async removeField({ commit }, index) {
        commit('removeField', index)
    },
    async clearFields({ commit }, index) {
        commit('clearFields')
    },
    async setImagesFile({ commit }, info) {
        commit('setImagesFile', info)
    },
    async setImagesPreview({ commit }, info) {
        commit('setImagesPreview', info)
    },
}

export const getters = {
    data: state => state.data,
    other: state => state.data.other,
}