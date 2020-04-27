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


module.exports.create = async(req, res) => {
    const category = await Categories.findOne({ title: req.body.title })

    if (category) {
        log.warn(`Неудачная попытка добавления новой категории (категория '${req.body.title}' уже существует)`);
        res.status(200).json({
            message: 'busy'
        })
    } else {

        try {
            let link = req.body.title;

            link = link.toLowerCase();

            link = await cyrillic().transform(link, "-")

            const SaveCategory = new Categories({
                title: req.body.title,
                link: link,
                status: req.body.status
            })

            await SaveCategory.save()

            log.info(`Успешное добавление новой категории '${req.body.title}'`);

            res.status(201).json({
                message: 'success'
            })

        } catch (e) {
            log.warn(`Неудачная попытка добавления новой категории '${req.body.title}' (ошибка обращения к базе)`);
            res.status(500).json(e)
        }
    }
}