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

module.exports.images = async(req, res) => {

    if (typeof(req.body.image) === 'string' &&
        typeof(req.body.id) === 'string' &&
        typeof(req.body.index) === 'string' || typeof(req.body.index) === 'number'
    ) {

        let image = req.body.image
        let id = req.body.id
        let index = req.body.index
        let mypath = `./assets/${id}`
        let createmyfile = `./assets/${id}/img-${index + 1}.png`
        let url

        if (image.indexOf(',', 0) !== -1) {

            let n = image.indexOf(',', 0)
            image = await image.slice(n)
            image = await Buffer.from(image, 'base64')
            image = await Jimp.read(image)
            image = await image.quality(60)
            image = await image.getBufferAsync(Jimp.AUTO)
            image = await image.toString('base64')


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
                fsExtra.writeFile(`./assets/${id}/img-${index + 1}.png`, image, 'base64', async function(err) {
                    if (err) {
                        throw err;
                    } else {
                        url = `${id}/img-${index + 1}.png`

                        try {
                            const product = await Product.updateOne({ _id: req.body.id }, {
                                $push: {
                                    images: {
                                        previewImg: url
                                    }
                                }
                            })
                            log.info(`Успешное добавление картинки для товара '${req.body.id}'!`);
                            res.json(product)

                        } catch (e) {
                            log.warn(`Неудачная попытка добавления картинки для товара '${req.body.id}'!`);
                            res.status(500).json(e)
                        }
                    }

                })
            }
        } else {
            try {
                const product = await Product.updateOne({ _id: req.body.id }, {
                    $push: {
                        images: {
                            previewImg: image
                        }
                    }
                })
                log.info(`Успешное добавление картинки для товара '${req.body.id}'!`);
                res.json(product)

            } catch (e) {
                log.warn(`Неудачная попытка добавления картинки для товара '${req.body.id}'!`);
                res.status(500).json(e)
            }
        }




    } else {
        log.warn(`images данные не прошли проверку`);
        res.status(500).json('Error server. Data did not pass verification')
    }


}