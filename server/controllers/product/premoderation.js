const Product = require('../../models/product.model')

module.exports.getPremoderationProduct = async(req, res) => {
    try {
        let products = await Product.find({ moderationStatus: false }).limit(10)
        res.json({
            products: products
        })
    } catch (e) {
        res.status(500).json(e)
    }

}