const Menu = require('../models/menu.model')
const request = require('request');
const fs = require('fs');
const SimpleNodeLogger  = require('simple-node-logger'),
	opts = {
		logFilePath:`project-${new Date().getMonth()}.log`,
		timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
	}
const log = SimpleNodeLogger.createSimpleLogger( opts );

module.exports.create = async (req, res) => {
    const paragraph = await Menu.findOne({title: req.body.title})

    if(paragraph) {
        log.warn(`Неудачная попытка добавления нового пункта меню (пункт '${req.body.title}' уже существует)`);
        res.status(409).json({
			message: 'This paragraph is already used'})
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
                message: 'success'})
        } catch(e) {
            log.warn(`Неудачная попытка добавления нового пункта меню ( пункт '${req.body.title}' неудалось сохранить в базу)`);
        }
    }
}

module.exports.edit = async (req, res) => {

    const $set = {
        title: req.body.title,
        link: req.body.link,
        status: req.body.status     
    }

    try {
        let menu = await Menu.findByIdAndUpdate({ _id: req.body.id },
            {$set}
            )
            log.info(`Успешное редактирование пункта меню '${req.body.title}'`);
            res.status(201).json({
                message: 'success'})
    } catch(e) {
        log.warn(`Неудачная попытка редактирования пункта меню '${req.body.title}' (неудалось сохранить в базу)`);
        res.status(500).json(e)
    }
}

module.exports.remove = async (req, res) => {
    try {
        let menu = await Menu.deleteOne({ _id: req.body.id })
        log.info(`Успешное удаление пункта меню`);
        res.status(200).json({
            message: 'delete-success'})
    } catch (e) {
        log.warn(`Неудачная попытка удаления пункта меню (ошибка обращения к базе)`);
        res.status(500).json(e)
    }
}


module.exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find()
        .collation({locale:'ru',strength: 2}).sort({title:1})
        res.json(menu)
    } catch(e) {
        res.status(500).json(e)
    }
}