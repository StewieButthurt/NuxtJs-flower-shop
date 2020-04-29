const Product = require('../../models/product.model')
const request = require('request');
const fs = require('fs');
const fsExtra = require('fs-extra');
const Axios = require('axios').default;
const FormData = require('form-data');
const Jimp = require('jimp');
const keys = require('../../keys')
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);


module.exports.getProductId = async(req, res) => {
    if (typeof(req.query.id) === 'string') {

        let id = req.query.id

        try {
            const product = await Product.findOne({ _id: req.query.id })
            res.json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    } else {
        res.status(500).json('data did not pass verification')
    }

}