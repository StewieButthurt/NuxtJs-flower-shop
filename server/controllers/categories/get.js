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


module.exports.get = async(req, res) => {
    try {
        let categories = await Categories.find()
            .collation({ locale: 'ru', strength: 2 }).sort({ title: 1 })
        res.json(categories)
    } catch (e) {
        res.status(500).json(e)
    }
}