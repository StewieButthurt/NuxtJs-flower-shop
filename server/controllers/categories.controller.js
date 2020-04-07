const Categories = require('../models/categories.model')
const request = require('request');
const fs = require('fs');
const cyrillic = require('cyrillic-to-translit-js');
const SimpleNodeLogger  = require('simple-node-logger'),
	opts = {
		logFilePath:`project-${new Date().getMonth()}.log`,
		timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
	}
const log = SimpleNodeLogger.createSimpleLogger( opts );

module.exports.create = async (req, res) => {
    const category = await Categories.findOne({title: req.body.title})

    if(category) {
        log.warn(`Неудачная попытка добавления новой категории (категория '${req.body.title}' уже существует)`);
        res.status(200).json({
			message: 'busy'})
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
                message: 'success'})

        } catch(e) {
            log.warn(`Неудачная попытка добавления новой категории '${req.body.title}' (ошибка обращения к базе)`);
            res.status(500).json(e)
        }
    }
}

module.exports.edit = async (req, res) => {

    let link = req.body.title;

    link = link.toLowerCase();

    link = await cyrillic().transform(link, "-")

    const $set = {
        title: req.body.title,
        link: link,
        status: req.body.status     
    }

    try {
        let category = await Categories.findByIdAndUpdate({ _id: req.body.id },
            {$set}
            )
            log.info(`Успешное редактирование категории '${req.body.title}'`);
            res.status(201).json({
                message: 'success'})
    } catch(e) {
        log.warn(`Неудачная попытка редактирования категории '${req.body.title}' (ошибка обращения к базе)`);
        res.status(500).json(e)
    }
}

module.exports.remove = async (req, res) => {
    try {
        let categories = await Categories.deleteOne({ _id: req.body.id })
        log.info(`Успешное удаление категории`);
        res.status(200).json({
            message: 'delete-success'})
    } catch (e) {
        log.warn(`Неудачная попытка удаления категории (ошибка обращения к базе)`);
        res.status(500).json(e)
    }
}

module.exports.getCategories = async (req, res) => {
    try {
        let categories = await Categories.find()
        .collation({locale:'ru',strength: 2}).sort({title:1})
        res.json(categories)
    } catch(e) {
        res.status(500).json(e)
    }
}