const Menu = require('../../models/menu.model')
const request = require('request');
const fs = require('fs');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports.edit = async(req, res) => {

    if (typeof(req.body.title) === 'string' &&
        typeof(req.body.link) === 'string' &&
        typeof(req.body.status) === 'boolean'
    ) {
        const $set = {
            title: req.body.title,
            link: req.body.link,
            status: req.body.status
        }

        try {
            let menu = await Menu.findByIdAndUpdate({ _id: req.body.id }, { $set })
            log.info(`Успешное редактирование пункта меню '${req.body.title}'`);
            res.status(201).json({
                message: 'success'
            })
        } catch (e) {
            log.warn(`Неудачная попытка редактирования пункта меню '${req.body.title}' (неудалось сохранить в базу)`);
            res.status(500).json(e)
        }
    } else {
        log.warn(`Ошибка редактирования пункта меню. 
                      Данные не прошли валидацию!`);
        res.status(500).json('Error server. Data did not pass verification')
    }

}