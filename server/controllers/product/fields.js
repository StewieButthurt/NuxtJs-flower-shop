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
    console.log('модуль fields')
    if (typeof(req.body.name) === 'string') {

        if (typeof(req.body.price) === 'number' &&
            typeof(req.body.descr) === 'string' &&
            typeof(req.body.article) === 'string' &&
            typeof(req.body.discountStatus) === 'boolean' &&
            typeof(req.body.sizeDiscount) === 'string' &&
            typeof(req.body.stock) === 'boolean' &&
            typeof(req.body.bestseller) === 'boolean' &&
            typeof(req.body.weekPrice) === 'boolean' &&
            typeof(req.body.moderationStatus) === 'boolean' &&
            (typeof(req.body.idProduct) === 'string' ||
                typeof(req.body.idProduct) === 'boolean')
        ) {
            for (let i = 0; i < req.body.categories.length; i++) {
                if (typeof(req.body.categories[i]) === 'string') {

                } else {
                    log.warn(`Неудачная попытка добавления основной информации о товаре 
                    '${req.body.name}'! Данные не прошли валидацию! Field Categories error!`);
                    res.json({ message: 'При загрузке произошла ошибка! Категории не прошли проверку!', error: 'true' })
                }

            }

            for (let a = 0; a < req.body.other.length; a++) {
                if (typeof(req.body.other[a].descr) === 'string' &&
                    typeof(req.body.other[a].title) === 'string'
                ) {

                } else {
                    log.warn(`Неудачная попытка добавления основной информации о товаре 
                    '${req.body.name}'! Данные не прошли валидацию! Field Other error`);
                    res.json({ message: 'При загрузке произошла ошибка! Описание товара не прошло проверку!', error: 'true' })
                }
            }

            for (let k = 0; k < req.body.newFields.length; k++) {
                if (typeof(req.body.newFields[k].title) === 'string') {
                    for (let c = 0; c < req.body.newFields[k].descr.length; c++) {
                        if (typeof(req.body.newFields[k].descr[c]) === 'string') {

                        } else {
                            log.warn(`Неудачная попытка добавления основной информации о товаре 
                            '${req.body.name}'! Данные не прошли валидацию! Field newFields.descr error`);
                            res.json({ message: 'При загрузке произошла ошибка! Дополнительные поля (пример с керамикой) не прошли проверку!', error: 'true' })
                        }
                    }
                } else {
                    log.warn(`Неудачная попытка добавления основной информации о товаре 
                    '${req.body.name}'! Данные не прошли валидацию! Field newFields error`);
                    res.json({ message: 'При загрузке произошла ошибка! Дополнительные поля (пример с керамикой) не прошли проверку!', error: 'true' })
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
                moderationStatus: req.body.moderationStatus
            })

            try {
                if (req.body.idProduct) {
                    await Product.findByIdAndUpdate({ _id: req.body.idProduct }, {
                        $set: {
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
                            moderationStatus: req.body.moderationStatus
                        }
                    })

                    log.info(`Успешное обновление основной информации о товаре!'${req.body.name}', id - '${req.body.idProduct}'`);

                    res.json({ product: { _id: req.body.idProduct }, message: 'Основные данные загружены!', error: 'false' })

                } else {
                    await product.save()

                    log.info(`Успешное добавление основной информации о товаре!'${req.body.name}'`);

                    res.json({ product: product, message: 'Основные данные загружены!', error: 'false' })
                }


            } catch (e) {
                log.warn(`Неудачная попытка добавления основной информации о товаре '${req.body.name}'! Ошибка обращения к базе!`);
                res.json({ message: 'При загрузке произошла ошибка! Неудалось сохранить данные в базе!', error: 'true' })
            }
        } else {
            log.warn(`Неудачная попытка добавления основной информации о товаре '${req.body.name}'! Данные не прошли валидацию!`);
            res.json({ message: 'При загрузке произошла ошибка! Основные данные о товаре не прошли проверку!', error: 'true' })
        }



    } else {
        log.warn(`Неудачная попытка добавления основной информации о товаре '${req.body.name}'! Данные не прошли валидацию!`);
        res.json({ message: 'При загрузке произошла ошибка! Название товара не прошло проверку!', error: 'true' })
    }
}