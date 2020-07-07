const Product = require('../../models/product.model')
const fs = require('fs')
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports.remove = async(req, res) => {
    try {
        await Product.deleteOne({ _id: req.body.id })

        const dir = `./assets/${req.body.id}`;

        fs.rmdir(dir, { recursive: true }, (err) => {
            if (err) {
                log.warn(`Неудачная попытка удаления изображений 
                у продукта '${req.body.id}'! Ошибка ${err}!`);
            }

            log.info(`Успешное удаление изображений 
            у продукта '${req.body.id}'!`);
        });


        log.info(`Успешное удаление продукта '${req.body.id}'!`);
        res.json({ message: `Product deleted` })
    } catch (e) {
        log.warn(`Неудачная попытка удаления продукта '${req.body.id}'!`);
        res.status(500).json(e)
    }
}