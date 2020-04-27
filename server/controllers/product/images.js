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

module.exports.images = async(req, res) => {

    let image = req.body.image
    let id = req.body.id
    let index = req.body.index
    let mypath = `./assets/${id}`
    let createmyfile = `./assets/${id}/img-${index + 1}.png`
    let url


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
                    log.info(`Успешное добавление картинки для товра '${req.body.id}'!`);
                    res.json(product)

                } catch (e) {
                    log.warn(`Неудачная попытка добавления картинки для товара '${req.body.id}'!`);
                    res.status(500).json(e)
                }
            }

        })
    }
}