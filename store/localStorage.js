export const state = () => ({
    data: {
        title: '',
        descr: '',
        price: '',
        article: '',
        other: [],
        newFields: [],
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
        state.data.newFields = [],
        state.data.other = [],
        state.data.images = [
            {
                file: null,
                previewImg: null,
                statusButton: true
            }
        ]
    },
    setImagesFile(state, info) {
        console.log(1)
        state.data.images[info.index].file = info.file
    },
    setImagesPreview(state, info) {
        state.data.images[info.index].previewImg = info.previewImg
    },
    setImageField(state, data) {
        let arr = state.data.images
        arr.push(data)
    },
    removeImageField(state, index) {
        let arr = state.data.images
        arr.splice(index, 1)
    },
    setNewFields(state, data) {
        let arr = state.data.newFields
        arr.push(data)
    },
    updateNewFieldDescr(state, info) {
        state.data.newFields[info.index].descr = info.val
    },
    removeNewField(state, index) {
        let arr = state.data.newFields
        arr.splice(index, 1)
    },
    updateNewFieldTitle(state, data) {
        state.data.newFields[data.index].title = data.title
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
    async setImagesFile({commit}, info) {
        commit('setImagesFile', info)
    },
    async setImagesPreview({commit}, info) {
        commit('setImagesPreview', info)
    },
    async setImageField({commit}, data) {
        commit('setImageField', data)
    },
    async setDataImage({commit}, data) {
        return api.saveImage(data)
    },
    async removeImageField({commit}, index) {
        commit('removeImageField', index)
    },
    
    async setNewFields({commit}, data) {
        commit('setNewFields', data)
    },
    async updateNewFieldDescr({commit}, info) {
        commit('updateNewFieldDescr', info)
    },
    async removeNewField({commit}, index) {
        commit('removeNewField', index)
    },
    updateNewFieldTitle({commit}, data) {
        commit('updateNewFieldTitle', data)
    }
}

export const getters = {
    data: state => state.data,
    newFields: state => state.data.newFields,
    title: state => state.data.title,
    descr: state => state.data.descr,
    price: state => state.data.price,
    article: state => state.data.article,
    other: state => state.data.other,
}