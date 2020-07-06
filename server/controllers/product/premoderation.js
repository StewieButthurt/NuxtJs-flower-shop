const Product = require('../../models/product.model')
const request = require('request');
const fs = require('fs');
const fsExtra = require('fs-extra');
const keys = require('../../keys')
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);


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