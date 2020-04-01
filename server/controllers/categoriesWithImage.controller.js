const CategoriesWithImage = require('../models/categoriesWithImage.model')
const request = require('request');
const fs = require('fs');
const cyrillic = require('cyrillic-to-translit-js');

// module.exports.create = async (req, res) => {
//     const category = await Categories.findOne({title: req.body.title})

//     if(category) {
//         res.status(200).json({
// 			message: 'busy'})
//     } else {
//         let link = req.body.title;

//         link = link.toLowerCase();

//         link = await cyrillic().transform(link, "-")

//         const SaveCategory = new Categories({
//             title: req.body.title,
//             link: link,
//             status: req.body.status
//         })

//         await SaveCategory.save()
//         res.status(201).json({
// 			message: 'success'})
//     }
// }

// module.exports.edit = async (req, res) => {

//     let link = req.body.title;

//     link = link.toLowerCase();

//     link = await cyrillic().transform(link, "-")

//     const $set = {
//         title: req.body.title,
//         link: link,
//         status: req.body.status     
//     }

//     try {
//         let category = await Categories.findByIdAndUpdate({ _id: req.body.id },
//             {$set}
//             )
//             res.status(201).json({
//                 message: 'success'})
//     } catch(e) {
//         res.status(500).json(e)
//     }
// }

// module.exports.remove = async (req, res) => {
//     try {
//         let categories = await Categories.deleteOne({ _id: req.body.id })
//         res.status(200).json({
//             message: 'delete-success'})
//     } catch (e) {
//         res.status(500).json(e)
//     }
// }

module.exports.getCategories = async (req, res) => {
    try {
        const categories = await CategoriesWithImage.find()
        res.json(categories)
    } catch(e) {
        res.status(500).json(e)
    }
}