const Product = require('../../models/product.model')
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);


module.exports.search = async(req, res) => {
    if (typeof(req.query.search) === 'string') {
        try {
            let article = await Product.find({ "article": { '$regex': `${req.query.search}`, '$options': 'i' } }).limit(10)
            let name = await Product.find({ "name": { '$regex': `${req.query.search}`, '$options': 'i' } }).limit(10)
            let categories = await Product.find({ "categories": { '$regex': `${req.query.search}`, '$options': 'i' } }).limit(10)
            res.json({
                article: article,
                name: name,
                categories: categories
            })
        } catch (e) {
            res.status(500).json(e)
        }
    } else {
        log.warn(`Ошибка поиска на странице редактирования товара. 
                      Данные не прошли валидацию!`);
        res.status(500).json('Error server. Data did not pass verification')
    }


}