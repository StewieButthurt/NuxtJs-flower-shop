import Vue from 'vue'

export const state = () => ({
    data: {
        other: [],
        newFields: [],
        otherFieldImage: [],
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
    setNewFields(state, data) {
        let arr = state.data.newFields
        arr.push(data)
    },
    updateNewFieldDescr(state, info) {
        state.data.newFields[info.index].descr = info.descr
    },
    removeNewField(state, index) {
        let arr = state.data.newFields
        arr.splice(index, 1)
    },
    updateNewFieldTitle(state, data) {
        state.data.newFields[data.index].title = data.title
    },
    addNewFieldWithImage(state, data) {
        state.data.otherFieldImage.push(data)
    },
    updateOtherFieldImage(state, { data, index, globalIndex }) {
        // console.log(globalIndex)
        state.data.otherFieldImage[globalIndex].info[index].image = {
            file: data.file,
            previewImg: data.previewImg
        }
    },
    setOtherFieldImage(state, { data, globalIndex }) {
        state.data.otherFieldImage[globalIndex].info.push(data)
    },
    removeOtherFieldImage(state, { index, globalIndex }) {
        state.data.otherFieldImage[globalIndex].info.splice(index, 1)
    },
    removeOtherFieldWithImageBlock(state, index) {
        state.data.otherFieldImage.splice(index, 1)
    },
    updateOtherFieldTitle(state, { title, index }) {
        state.data.otherFieldImage[index].title = title
    },
    updateOtherFieldImageTitle(state, { title, globalIndex, index }) {
        state.data.otherFieldImage[globalIndex].info[index].title = title
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
    async setNewFields({ commit }, data) {
        commit('setNewFields', data)
    },
    async updateNewFieldDescr({ commit }, info) {
        commit('updateNewFieldDescr', info)
    },
    async removeNewField({ commit }, index) {
        commit('removeNewField', index)
    },
    async updateNewFieldTitle({ commit }, data) {
        commit('updateNewFieldTitle', data)
    },
    async addNewFieldWithImage({ commit }, data) {
        commit('addNewFieldWithImage', data)
    },
    async updateOtherFieldImage({ commit }, { data, index, globalIndex }) {
        commit('updateOtherFieldImage', { data, index, globalIndex })
    },
    async setOtherFieldImage({ commit }, { data, globalIndex }) {
        commit('setOtherFieldImage', { data, globalIndex })
    },
    async removeOtherFieldImage({ commit }, { index, globalIndex }) {
        commit('removeOtherFieldImage', { index, globalIndex })
    },
    async removeOtherFieldWithImageBlock({ commit }, index) {
        commit('removeOtherFieldWithImageBlock', index)
    },
    async updateOtherFieldTitle({ commit }, { title, index }) {
        commit('updateOtherFieldTitle', { title, index })
    },
    async updateOtherFieldImageTitle({ commit }, { title, globalIndex, index }) {
        commit('updateOtherFieldImageTitle', { title, globalIndex, index })
    }
}

export const getters = {
    data: state => state.data,
    newFields: state => state.data.newFields,
    images: state => state.data.images,
    other: state => state.data.other,
    otherFieldImage: state => state.data.otherFieldImage,
}