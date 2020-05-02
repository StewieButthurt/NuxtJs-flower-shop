import Vue from 'vue'

export const state = () => ({
    data: {
        images: [{
                file: null,
                previewImg: 'flower.png',
                text: 'Главная картинка'
            },
            {
                file: null,
                previewImg: 'other-fields-image-blue.jpg',
                text: 'Картинка №2'
            },
            {
                file: null,
                previewImg: null,
                text: 'Картинка №3'
            },
            {
                file: null,
                previewImg: null,
                text: 'Картинка №4'
            },
            {
                file: null,
                previewImg: null,
                text: 'Картинка №5'
            },
            {
                file: null,
                previewImg: null,
                text: 'Картинка №6'
            }
        ],
        name: '',
        descr: '',
        price: '',
        article: '',
        discountStatus: false,
        sizeDiscount: 0,
        other: [],
        newFields: [],
        stock: false,
        bestseller: false,
        weekPrice: false,
        otherFieldImage: [],
        categories: []
    }
})

export const mutations = {
    setName(state, name) {
        state.data.name = name
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
    setDiscount(state, discount) {
        state.data.sizeDiscount = discount
    },
    setDiscountStatus(state, discountStatus) {
        state.data.discountStatus = discountStatus
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
        state.data.name = '',
            state.data.descr = '',
            state.data.price = '',
            state.data.article = '',
            state.data.newFields = [],
            state.data.other = [],
            this.discountStatus = false,
            this.sizeDiscount = 0
        state.data.images = [{
            file: null,
            previewImg: null
        }]
    },
    updateDataImage(state, data) {
        state.data.images.splice(data.index, 1, data.data)
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
    },
    setStock(state, stock) {
        state.data.stock = stock
    },
    setBestseller(state, bestseller) {
        state.data.bestseller = bestseller
    },
    setWeekPrice(state, weekPrice) {
        state.data.weekPrice = weekPrice
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
    setCategories(state, value) {
        state.data.categories = value
    },
    setData(state, data) {
        state.data = data
    }
}

export const actions = {
    async setData({ commit }, data) {
        commit('setData', data)
    },
    async setName({ commit }, name) {
        commit('setName', name)
    },
    async setPrice({ commit }, price) {
        commit('setPrice', price)
    },
    async setDescr({ commit }, descr) {
        commit('setDescr', descr)
    },
    async setArticle({ commit }, article) {
        commit('setArticle', article)
    },
    async setDiscount({ commit }, discount) {
        commit('setDiscount', discount)
    },
    async setDiscountStatus({ commit }, val) {
        commit('setDiscountStatus', val)
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
    async setImageField({ commit }, data) {
        commit('setImageField', data)
    },
    async updateDataImage({ commit }, data) {
        commit('updateDataImage', data)
    },
    async removeImageField({ commit }, index) {
        commit('removeImageField', index)
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
    async setStock({ commit }, stock) {
        commit('setStock', stock)
    },
    async setBestseller({ commit }, bestseller) {
        commit('setBestseller', bestseller)
    },
    async setWeekPrice({ commit }, weekPrice) {
        commit('setWeekPrice', weekPrice)
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
    },
    async setCategories({ commit }, value) {
        commit('setCategories', value)
    }
}

export const getters = {
    data: state => state.data,
    newFields: state => state.data.newFields,
    name: state => state.data.name,
    descr: state => state.data.descr,
    price: state => state.data.price,
    images: state => state.data.images,
    article: state => state.data.article,
    discountStatus: state => state.data.discountStatus,
    sizeDiscount: state => state.data.sizeDiscount,
    other: state => state.data.other,
    stock: state => state.data.stock,
    bestseller: state => state.data.bestseller,
    weekPrice: state => state.data.weekPrice,
    otherFieldImage: state => state.data.otherFieldImage,
    categories: state => state.data.categories
}