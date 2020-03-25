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
            count: req.body.count,
            status: req.body.status
        })

        await menu.save()
        res.status(201).json({
			message: 'success'})
    }
}