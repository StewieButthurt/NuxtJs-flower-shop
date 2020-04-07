const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {
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
    discountStatus: {
        type: Boolean,
        required: true
    },
    sizeDiscount: {
        type: String,
        required: true
    },
    newFields: [
        {
            descr: {
                type: [String],
                required: true
            },
            statusButton: {
                type: Boolean,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }
    ],
    other: [
        {
            descr: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Boolean,
        required: true
    },
    bestseller: {
        type: Boolean,
        required: true
    },
    weekPrice: {
        type: Boolean,
        required: true
    },
    images: [
        {
            previewImg: {
                type: String,
                required: true
            }
        }
    ],
    otherFieldImage: [
        {
            info: [
                {
                    image: {
                        previewImg: {
                            type: String,
                            required: true
                        }
                    },
                    title: {
                        type: String,
                        required: true
                    }
                }
            ],
            title: {
                type: String,
                required: true
            }
        }
    ]
})

productSchema.index({ name: 1 })
productSchema.index({ categories: 1 })
productSchema.index({ article: 1 })

module.exports = model('product', productSchema)

