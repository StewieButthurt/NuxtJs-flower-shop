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


module.exports.fields = async(req, res) => {
    const name = await Product.findOne({ name: req.body.name })

    if (name) {
        log.warn(`Неудачная попытка добавления нового товара! Товар '${req.body.name}' уже существует!`);
        res.json({ message: 'busy' })
    } else {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            descr: req.body.descr,
            article: req.body.article,
            categories: req.body.categories,
            discountStatus: req.body.discountStatus,
            sizeDiscount: req.body.sizeDiscount,
            newFields: req.body.newFields,
            other: req.body.other,
            stock: req.body.stock,
            bestseller: req.body.bestseller,
            weekPrice: req.body.weekPrice,
        })

        try {
            await product.save()

            log.info(`Успешное добавление основной информации о товаре!'${req.body.name}'`);

            res.status(201).json({ product })
        } catch (e) {
            log.warn(`Неудачная попытка добавления основной информации о товаре '${req.body.name}'! Ошибка обращения к базе!`);
            res.status(500).json(e)
        }


    }
}