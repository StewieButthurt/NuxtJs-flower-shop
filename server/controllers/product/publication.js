const Product = require('../../models/product.model')

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports.publication = async(req, res) => {
    const $set = {
        moderationStatus: true
    }
    try {
        await Product.findByIdAndUpdate({ _id: req.body.id }, { $set })
        log.info(`Продукт '${req.body.id}' опубликован!`);
        res.json('Product Published')
    } catch (e) {
        log.warn(`Неудачная попытка публикации товара '${req.body.id}'!`);
        res.status(500).json(e)
    }
}