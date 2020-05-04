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


module.exports.fields = async(req, res) => {
    if (typeof(req.body.name) === 'string') {
        const name = await Product.findOne({ name: req.body.name })
        if (name) {
            log.warn(`Неудачная попытка добавления нового товара! Товар '${req.body.name}' уже существует!`);
            res.json({ message: 'busy' })
        } else {
            console.log('price', typeof(req.body.price))
            console.log('descr', typeof(req.body.descr))
            console.log('article', typeof(req.body.article))
            console.log('discountStatus', typeof(req.body.discountStatus))
            console.log('sizeDiscount', typeof(req.body.sizeDiscount))
            console.log('stock', typeof(req.body.stock))
            console.log('bestseller', typeof(req.body.bestseller))
            console.log('weekPrice', typeof(req.body.weekPrice))
            if (typeof(req.body.price) === 'number' &&
                typeof(req.body.descr) === 'string' &&
                typeof(req.body.article) === 'string' &&
                typeof(req.body.discountStatus) === 'boolean' &&
                typeof(req.body.sizeDiscount) === 'string' &&
                typeof(req.body.stock) === 'boolean' &&
                typeof(req.body.bestseller) === 'boolean' &&
                typeof(req.body.weekPrice) === 'boolean'
            ) {
                console.log(1)
                for (let i = 0; i < req.body.categories.length; i++) {
                    if (typeof(req.body.categories[i]) === 'string') {

                    } else {
                        log.warn(`Неудачная попытка добавления основной информации о товаре 
                        '${req.body.name}'! Данные не прошли валидацию! Field Categories error!`);
                        res.json({ message: 'Field Categories error' })
                    }

                }

                for (let a = 0; a < req.body.other.length; a++) {
                    if (typeof(req.body.other[a].descr) === 'string' &&
                        typeof(req.body.other[a].title) === 'string'
                    ) {

                    } else {
                        log.warn(`Неудачная попытка добавления основной информации о товаре 
                        '${req.body.name}'! Данные не прошли валидацию! Field Other error`);
                        res.json({ message: 'Field Other error' })
                    }
                }

                for (let k = 0; k < req.body.newFields.length; k++) {
                    if (typeof(req.body.newFields[k].statusButton) === 'boolean' &&
                        typeof(req.body.newFields[k].title) === 'string'
                    ) {
                        for (let c = 0; c < req.body.newFields[k].descr.length; c++) {
                            if (typeof(req.body.newFields[k].descr[c]) === 'string') {

                            } else {
                                log.warn(`Неудачная попытка добавления основной информации о товаре 
                                '${req.body.name}'! Данные не прошли валидацию! Field newFields.descr error`);
                                res.json({ message: 'Field newFields.descr error' })
                            }
                        }
                    } else {
                        log.warn(`Неудачная попытка добавления основной информации о товаре 
                        '${req.body.name}'! Данные не прошли валидацию! Field newFields error`);
                        res.json({ message: 'Field newFields error' })
                    }
                }

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
                    res.json({ message: 'error save' })
                }
            } else {
                log.warn(`Неудачная попытка добавления основной информации о товаре '${req.body.name}'! Данные не прошли валидацию!`);
                res.json({ message: 'main info validate error' })
            }

        }

    } else {
        log.warn(`Неудачная попытка добавления основной информации о товаре '${req.body.name}'! Данные не прошли валидацию!`);
        res.json({ message: 'error validate name' })
    }
}