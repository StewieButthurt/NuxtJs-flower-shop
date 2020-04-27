const Product = require('../../models/product.model')
const request = require('request');
const fs = require('fs');
const fsExtra = require('fs-extra');
const Axios = require('axios').default;
const FormData = require('form-data');
const Jimp = require('jimp');
const keys = require('../../keys')
const { check, validationResult } = require('express-validator');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);


module.exports.search = async(req, res) => {
    console.log('сервер', req.query.search)
    try {
        let article = await Product.find({ "article": { '$regex': `${req.query.search}`, '$options': 'i' } }).limit(10)
        let name = await Product.find({ "name": { '$regex': `${req.query.search}`, '$options': 'i' } }).limit(10)
        let categories = await Product.find({ "categories": { '$regex': `${req.query.search}`, '$options': 'i' } }).limit(10)
        res.json({
            article: article,
            name: name,
            categories: categories
        })
    } catch (e) {
        res.status(500).json(e)
    }

}