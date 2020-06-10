const Product = require('../../models/product.model')
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);


module.exports.otherImagesTitle = async(req, res) => {
    if (typeof(req.body.title) === 'string' &&
        typeof(req.body.id) === 'string' &&
        typeof(req.body.index) === 'number'
    ) {

        let title = req.body.title

        try {
            if (req.body.index === 0) {

                const product = await Product.updateOne({ _id: req.body.id }, {

                    otherFieldImage: {
                        info: [],
                        title: title
                    }
                })

                log.info(`Успешное добавление раздела с доп.картинками для товара '${req.body.id}'!`);
                res.json(product)

            } else {
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

            }


        } catch (e) {
            log.warn(`Неудачная попытка добавления раздела с доп.картинками для товара '${req.body.id}'!`);
            res.status(500).json(e)
        }

    } else {
        log.warn(` OtherImageTitle Данные не прошли валидацию!`);
        res.status(500).json('Error server. Data did not pass verification')
    }
}