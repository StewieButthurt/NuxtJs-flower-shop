const City = require('../models/product.model')
const request = require('request');
const fs = require('fs');
const Axios = require('axios').default;
const FormData = require('form-data');
const Jimp = require('jimp');
const keys = require('../keys')


module.exports.create = async (req, res) => {
    var urlLink = [];
    var delete_url = [];
    async function getUrl()  {
        for( let i = 0; i < req.body.previewImg.length; i++) {
            let file = req.body.previewImg[i];
            // console.log(req.body.file)
            // file = await file.slice(23)
            let n = file.indexOf(',', 0)
            file = await file.slice(n)
            file = await Buffer.from(file, 'base64')
            file = await Jimp.read(file)
            file = file.quality(60)
            file = await file.getBufferAsync(Jimp.AUTO)
            file = file.toString('base64')
            var bodyData = new FormData();
            bodyData.append('image', file);
            try{
               let img =  await Axios({
                    method  : 'post',
                    url     : `https://api.imgbb.com/1/upload?key=${keys.IMG_BB}`,
                    headers : bodyData.getHeaders(),
                    data    : bodyData
                })
                setUrl(img.data.data.url, img.data.data.delete_url)
            } catch(e) {
                console.log(e.response)
            }
        }
    }
    await getUrl();
    
    async function setUrl(url, deleteUrl) {
        urlLink.push(url)
        delete_url.push(deleteUrl)
        if(req.body.previewImg.length === urlLink.length) {
            const city = new City({
                title: req.body.title,
                descr: req.body.descr,
                previewImg: urlLink,
                deleteUrl: delete_url
            })
        
            try {
                await city.save()
                res.status(201).json({ message: 'City create' })
            } catch (e) {
                res.status(500).json(e)
            }
        }
    }
}


module.exports.updateCity = async (req, res) => {
    const $set = {
        title: req.body.title,
        descr: req.body.descr
    }
    try {
        let city = await City.findByIdAndUpdate({ _id: req.body.id},
            {$set}
            )
        res.json(city)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getCity = async (req, res) => {
    try {
        const city = await City.find()
        res.json(city)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.remove = async (req, res) => {
    try {
        const city = await City.deleteOne({_id: req.body.id})
        res.json({ message: `City deleted`})
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.searchCity = async (req, res) => {
    
    try {
        const city = await City.findOne({title: req.body.url})
        res.json(city)
    } catch (e) {
        console.log(400)
        res.status(400).json(e)
    }
}   