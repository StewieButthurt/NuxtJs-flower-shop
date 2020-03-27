const {Schema, model} = require('mongoose');

const categoriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

module.exports = model('categories', categoriesSchema)