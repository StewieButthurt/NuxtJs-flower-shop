const Categories = require('../models/categories.model')
const request = require('request');
const fs = require('fs');
const cyrillic = require('cyrillic-to-translit-js');

module.exports.create = async (req, res) => {
    const category = await Categories.findOne({title: req.body.title})

    if(category) {
        res.status(409).json({
			message: 'This categories is already used'})
    } else {
        let link = req.body.title;

        link = link.toLowerCase();

        link = await cyrillic().transform(link, "-")

        const SaveCategory = new Categories({
            title: req.body.title,
            link: link,
            status: req.body.status
        })

        await SaveCategory.save()
        res.status(201).json({
			message: 'success'})
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
        let menu = await Categories.findByIdAndUpdate({ _id: req.body.id },
            {$set}
            )
            res.status(201).json({
                message: 'success'})
    } catch(e) {
        res.status(500).json(e)
    }
}


module.exports.getCategories = async (req, res) => {
    try {
        const categories = await Categories.find()
        .collation({locale:'ru',strength: 2}).sort({title:1})
        res.json(categories)
    } catch(e) {
        res.status(500).json(e)
    }
}