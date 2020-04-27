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


module.exports.otherImagesTitle = async(req, res) => {
    let title = req.body.title

    try {
        const product = await Product.updateOne({ _id: req.body.id }, {
            $push: {
                otherFieldImage: {
                    info: [],
                    title: title
                }
            }
        })
        log.info(`Успешное добавление раздела с доп.картинками для товара '${req.body.id}'!`);
        res.json(product)

    } catch (e) {
        log.warn(`Неудачная попытка добавления раздела с доп.картинками для товара '${req.body.id}'!`);
        res.status(500).json(e)
    }
}