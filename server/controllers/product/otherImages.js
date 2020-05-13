const Product = require('../../models/product.model')
const fs = require('fs');
const fsExtra = require('fs-extra');
const Jimp = require('jimp');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);


module.exports.otherImages = async(req, res) => {

    if (typeof(req.body.image) === 'string' &&
        typeof(req.body.id) === 'string' &&
        typeof(req.body.newId) === 'string' &&
        typeof(req.body.index) === 'string' || typeof(req.body.index) === 'number' &&
        typeof(req.body.globalIndex) === 'string' || typeof(req.body.globalIndex) === 'number' &&
        typeof(req.body.title) === 'string'
    ) {

        let image = req.body.image
        let id = req.body.id
        let newId = req.body.newId
        let index = req.body.index
        let globalIndex = req.body.globalIndex
        let title = req.body.title
        let mypath = `./assets/${id}/${newId}`
        let createmyfile = `./assets/${id}/${newId}/img-${index + 1}.png`
        let url

        if (image.indexOf(',', 0) !== -1) {

            let n = image.indexOf(',', 0)
            image = await image.slice(n)
            image = await Buffer.from(image, 'base64')
            image = await Jimp.read(image)
            image = image.quality(60)
            image = await image.getBufferAsync(Jimp.AUTO)
            image = image.toString('base64')

            fs.access(mypath, fs.F_OK, (err) => {
                if (err) {
                    fs.mkdir(mypath, { recursive: true }, (err) => {
                        if (err) {
                            throw err
                        } else {
                            newWriteFile()
                        }
                    });
                } else {
                    newWriteFile()
                }
            })


            async function newWriteFile() {
                fsExtra.writeFile(`./assets/${id}/${newId}/img-${index + 1}.png`, image, 'base64', async function(err) {
                    if (err) {
                        throw err;
                    } else {
                        url = `${id}/${newId}/img-${index + 1}.png`


                        try {
                            const product = await Product.updateOne({
                                _id: req.body.id,
                                'otherFieldImage._id': newId
                            }, {
                                $push: {
                                    'otherFieldImage.$.info': {
                                        "image": {
                                            "previewImg": `${url}`
                                        },
                                        "title": `${title}`
                                    }
                                }
                            })

                            log.info(`Успешное добавление дополнительной картинки для товара '${req.body.id}'!`);

                            res.json(product)

                        } catch (e) {
                            log.warn(`Неудачная попытка добавления дополнительной картинки для товара '${req.body.id}'!`);
                            res.status(500).json(e)
                        }
                    }

                })
            }
        } else {
            url = `${id}/${newId}/img-${index + 1}.png`

            try {
                const product = await Product.updateOne({
                    _id: req.body.id,
                    'otherFieldImage._id': newId
                }, {
                    $push: {
                        'otherFieldImage.$.info': {
                            "image": {
                                "previewImg": `${url}`
                            },
                            "title": `${title}`
                        }
                    }
                })

                log.info(`Успешное добавление дополнительной картинки для товара '${req.body.id}'!`);

                res.json(product)

            } catch (e) {
                log.warn(`Неудачная попытка добавления дополнительной картинки для товара '${req.body.id}'!`);
                res.status(500).json(e)
            }
        }

    } else {
        log.warn(`otherImages Данные не прошли проверку!`);
        res.status(500).json('Error server. Data did not pass verification')
    }


}