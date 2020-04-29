const Menu = require('../../models/menu.model')
const request = require('request');
const fs = require('fs');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports.create = async(req, res) => {
    if (typeof(req.body.title) === 'string') {
        const paragraph = await Menu.findOne({ title: req.body.title })

        if (paragraph) {
            log.warn(`Неудачная попытка добавления нового пункта меню (пункт '${req.body.title}' уже существует)`);
            res.status(409).json({
                message: 'This paragraph is already used'
            })
        } else {

            const menu = new Menu({
                title: req.body.title,
                link: req.body.link,
                status: req.body.status
            })

            try {
                await menu.save()
                log.info(`Успешное добавление нового пункта меню '${req.body.title}'`);
                res.status(201).json({
                    message: 'success'
                })
            } catch (e) {
                log.warn(`Неудачная попытка добавления нового пункта меню ( пункт '${req.body.title}' неудалось сохранить в базу)`);
            }
        }
    } else {
        log.warn(`Ошибка создания пункта меню. Данные не прошли валдиацию!`);
        res.status(500).json('Error server. Data did not pass verification')
    }

}