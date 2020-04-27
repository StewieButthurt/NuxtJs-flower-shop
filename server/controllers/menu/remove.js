const Menu = require('../../models/menu.model')
const request = require('request');
const fs = require('fs');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports.remove = async(req, res) => {
    try {
        let menu = await Menu.deleteOne({ _id: req.body.id })
        log.info(`Успешное удаление пункта меню`);
        res.status(200).json({
            message: 'delete-success'
        })
    } catch (e) {
        log.warn(`Неудачная попытка удаления пункта меню (ошибка обращения к базе)`);
        res.status(500).json(e)
    }
}