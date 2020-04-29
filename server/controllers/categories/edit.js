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


module.exports.edit = async(req, res) => {

    if (typeof(req.body.title) === 'string' &&
        typeof(req.body.status) === 'boolean' &&
        typeof(req.body.id) === 'string'
    ) {

        let link = req.body.title;

        link = link.toLowerCase();

        link = await cyrillic().transform(link, "-")

        const $set = {
            title: req.body.title,
            link: link,
            status: req.body.status
        }

        try {
            let category = await Categories.findByIdAndUpdate({ _id: req.body.id }, { $set })
            log.info(`Успешное редактирование категории '${req.body.title}'`);
            res.status(201).json({
                message: 'success'
            })
        } catch (e) {
            log.warn(`Неудачная попытка редактирования категории '${req.body.title}' (ошибка обращения к базе)`);
            res.status(500).json(e)
        }
    } else {
        log.warn(`Ошибка редактирования категории. 
                      Данные не прошли валидацию!`);
        res.status(500).json('Error server. Data did not pass verification')
    }


}