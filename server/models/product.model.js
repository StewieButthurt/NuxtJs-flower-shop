const {Schema, model} = require('mongoose');

const citySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    previewImg: {
        type: [String],
        required: true
    },
    deleteUrl: {
        type: [String],
        required: true
    }
})

module.exports = model('city', citySchema)

