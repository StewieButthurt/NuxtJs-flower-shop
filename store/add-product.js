export const state = () => ({
	images: [],
    title: '',
    descr: '',
    price: '',
    article: '',
    discountStatus: false,
    sizeDiscount: 0,
    other: [],
    newFields: []
})

export const mutations = {
	setTitle(state, title) {
        state.title = title
    },
    setDescr(state, descr) {
        state.descr = descr
    },
    setPrice(state, price) {
        state.price = price
    },
    setArticle(state, article) {
        state.article = article
    },
    setDiscount(state, discount) {
        state.sizeDiscount = discount
    },
    setDiscountStatus(state, discountStatus) {
        state.discountStatus = discountStatus
    },
    setOtherTitle(state, info) {
        state.other[info.index].title = info.title
    },
    setOtherDescr(state, info) {
        state.other[info.index].descr = info.descr
    },
    setField(state, data) {
        let arr = state.other
        arr.push(data)
    },
    removeField(state, index) {
        let arr = state.other
        arr.splice(index, 1)
    },
    clearFields(state) {
        state.title = '',
        state.descr = '',
        state.price = '',
        state.article = '',
        state.newFields = [],
        state.other = [],
        this.discountStatus = false,
        this.sizeDiscount = 0
        state.images = [
            {
                file: null,
                previewImg: null
            }
        ]
    },
    setImagesFile(state, info) {
        state.images[info.index].file = info.file
    },
    setImagesPreview(state, info) {
        state.images[info.index].previewImg = info.previewImg
    },
    updateDataImage(state, data) {
        state.images[data.index] = data.data
    },
    setImageField(state, data) {
        let arr = state.images
        arr.push(data)
    },
    removeImageField(state, index) {
        let arr = state.images
        arr.splice(index, 1)
    },
    setNewFields(state, data) {
        let arr = state.newFields
        arr.push(data)
    },
    updateNewFieldDescr(state, info) {
        state.newFields[info.index].descr = info.val
    },
    removeNewField(state, index) {
        let arr = state.newFields
        arr.splice(index, 1)
    },
    updateNewFieldTitle(state, data) {
        state.newFields[data.index].title = data.title
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
    async setDiscount({commit}, discount) {
        commit('setDiscount', discount)
    },
    async setDiscountStatus({commit}, val) {
        commit('setDiscountStatus', val)
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
    async updateDataImage({commit}, data) {
        commit('updateDataImage', data)
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
    async updateNewFieldTitle({commit}, data) {
        commit('updateNewFieldTitle', data)
    }
}

export const getters = {
	data: state => state,
    newFields: state => state.newFields,
    title: state => state.title,
    descr: state => state.descr,
    price: state => state.price,
    images: state => state.images,
    article: state => state.article,
    discountStatus: state => state.discountStatus,
    sizeDiscount: state => state.sizeDiscount,
    other: state => state.other
}