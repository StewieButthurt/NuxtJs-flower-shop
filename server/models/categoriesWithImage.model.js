const {Schema, model} = require('mongoose');

const categoriesWithImage = new Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = model('categoriesimage', categoriesWithImage)