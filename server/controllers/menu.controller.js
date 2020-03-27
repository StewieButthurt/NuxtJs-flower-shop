const Menu = require('../models/menu.model')
const request = require('request');
const fs = require('fs');
const Axios = require('axios').default;

module.exports.create = async (req, res) => {
    const paragraph = await Menu.findOne({title: req.body.title})

    if(paragraph) {
        res.status(409).json({
			message: 'This paragraph is already used'})
    } else {
        const menu = new Menu({
            title: req.body.title,
            link: req.body.link,
            status: req.body.status
        })

        await menu.save()
        res.status(201).json({
			message: 'success'})
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
            res.status(201).json({
                message: 'success'})
    } catch(e) {
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