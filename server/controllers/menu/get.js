const Menu = require('../../models/menu.model')
const request = require('request');
const fs = require('fs');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports.get = async(req, res) => {
    try {
        const menu = await Menu.find()
            .collation({ locale: 'ru', strength: 2 }).sort({ title: 1 })
        res.json(menu)
    } catch (e) {
        res.status(500).json(e)
    }
}