const Categories = require('../../models/categories.model')
const request = require('request');
const fs = require('fs');
const cyrillic = require('cyrillic-to-translit-js');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);


module.exports.remove = async(req, res) => {
    try {
        let categories = await Categories.deleteOne({ _id: req.body.id })
        log.info(`Успешное удаление категории`);
        res.status(200).json({
            message: 'delete-success'
        })
    } catch (e) {
        log.warn(`Неудачная попытка удаления категории (ошибка обращения к базе)`);
        res.status(500).json(e)
    }
}