const Product = require('../models/product.model')
const request = require('request');
const fs = require('fs');
const fsExtra = require('fs-extra');
const Axios = require('axios').default;
const FormData = require('form-data');
const Jimp = require('jimp');
const keys = require('../keys')


module.exports.fields = async (req, res) => {
    const name = await Product.findOne({name: req.body.name})

    if(name) {
        res.json({message: 'busy'})
    } else {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            descr: req.body.descr,
            article: req.body.article,
            categories: req.body.categories,
            discountStatus: req.body.discountStatus,
            sizeDiscount: req.body.sizeDiscount,
            newFields: req.body.newFields,
            other: req.body.other,
            stock: req.body.stock,
            bestseller: req.body.bestseller,
            weekPrice: req.body.weekPrice,
        })

        await product.save()
        res.status(201).json({product})
    }
}

module.exports.images = async (req, res) => {
    
    let image = req.body.image
    let id = req.body.id
    let index = req.body.index
    let mypath = `./assets/${id}`
    let createmyfile = `./assets/${id}/img-${index + 1}.png`
    let url


    let n = image.indexOf(',', 0)
    image = await image.slice(n)
    image = await Buffer.from(image, 'base64')
    image = await Jimp.read(image)
    image = image.quality(60)
    image = await image.getBufferAsync(Jimp.AUTO)
    image = image.toString('base64')

    fs.access(mypath, fs.F_OK, (err) => {
        if (err) {
            fs.mkdir(mypath, { recursive: true }, (err) => {
                if (err) {
                    throw err
                } else {
                    newWriteFile()
                }
            });
        } else {
            newWriteFile()
        }
    })

    

    async function newWriteFile() {
        fsExtra.writeFile(`./assets/${id}/img-${index + 1}.png`, image, 'base64', async function(err) {
            if(err) {
                throw err;
            } else {
            url = `./assets/${id}/img-${index + 1}.png`
            
                try {
                    const product = await Product.update(
                        {_id: req.body.id},
                        { $push: { 
                                images: {
                                    previewImg: url
                                }
                            } 
                        }
                    )
        
                    res.json(product)

                } catch (e) {
                    res.status(500).json(e)
                }
            }

        })
    }
}

module.exports.otherImagesTitle = async (req, res) => {
    let title = req.body.title

    try {
        const product = await Product.update(
            {_id: req.body.id},
            { $push: { 
                otherFieldImage: {
                        info: [],
                        title: title
                    }
                } 
            }
        )

        res.json(product)

    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.otherImages = async (req, res) => {

    let image = req.body.image
    let id = req.body.id
    let newId = req.body.newId
    let index = req.body.index
    let globalIndex = req.body.globalIndex
    let title = req.body.title
    let mypath = `./assets/${id}/${newId}`
    let createmyfile = `./assets/${id}/${newId}/img-${index + 1}.png`
    let url

    let n = image.indexOf(',', 0)
    image = await image.slice(n)
    image = await Buffer.from(image, 'base64')
    image = await Jimp.read(image)
    image = image.quality(60)
    image = await image.getBufferAsync(Jimp.AUTO)
    image = image.toString('base64')

    fs.access(mypath, fs.F_OK, (err) => {
        if (err) {
            fs.mkdir(mypath, { recursive: true }, (err) => {
                if (err) {
                    throw err
                } else {
                    newWriteFile()
                }
            });
        } else {
            newWriteFile()
        }
    })


    async function newWriteFile() {
        fsExtra.writeFile(`./assets/${id}/${newId}/img-${index + 1}.png`, image, 'base64', async function(err) {
            if(err) {
                throw err;
            } else {
            url = `./assets/${id}/${newId}/img-${index + 1}.png`


            try {
                const product = await Product.update(
                    {_id: req.body.id},
                    { $push: {'otherFieldImage.0.episodes.0.videos.$.reports': data.details}}
                )
    
                res.json(product)

            } catch (e) {
                res.status(500).json(e)
            }
            }

        })
    }
}

module.exports.getProductId = async (req, res) => {
    let id = req.query.id

    console.log(id)
    console.log(req.query.id)
    console.log(1)

    try {
        const product = await Product.findOne({_id: req.query.id})
        res.json(product)
    } catch (e) {
        res.status(500).json(e)
    }
}


// module.exports.create = async (req, res) => {
//     var urlLink = [];
//     var delete_url = [];
//     async function getUrl()  {
//         for( let i = 0; i < req.body.previewImg.length; i++) {
//             let file = req.body.previewImg[i];
//             // console.log(req.body.file)
//             // file = await file.slice(23)
//             let n = file.indexOf(',', 0)
//             file = await file.slice(n)
//             file = await Buffer.from(file, 'base64')
//             file = await Jimp.read(file)
//             file = file.quality(60)
//             file = await file.getBufferAsync(Jimp.AUTO)
//             file = file.toString('base64')
//             var bodyData = new FormData();
//             bodyData.append('image', file);
//             try{
//                let img =  await Axios({
//                     method  : 'post',
//                     url     : `https://api.imgbb.com/1/upload?key=${keys.IMG_BB}`,
//                     headers : bodyData.getHeaders(),
//                     data    : bodyData
//                 })
//                 setUrl(img.data.data.url, img.data.data.delete_url)
//             } catch(e) {
//                 console.log(e.response)
//             }
//         }
//     }
//     await getUrl();
    
//     async function setUrl(url, deleteUrl) {
//         urlLink.push(url)
//         delete_url.push(deleteUrl)
//         if(req.body.previewImg.length === urlLink.length) {
//             const city = new City({
//                 title: req.body.title,
//                 descr: req.body.descr,
//                 previewImg: urlLink,
//                 deleteUrl: delete_url
//             })
        
//             try {
//                 await city.save()
//                 res.status(201).json({ message: 'City create' })
//             } catch (e) {
//                 res.status(500).json(e)
//             }
//         }
//     }
// }


// module.exports.updateCity = async (req, res) => {
//     const $set = {
//         title: req.body.title,
//         descr: req.body.descr
//     }
//     try {
//         let city = await City.findByIdAndUpdate({ _id: req.body.id},
//             {$set}
//             )
//         res.json(city)
//     } catch (e) {
//         res.status(500).json(e)
//     }
// }

// module.exports.getCity = async (req, res) => {
//     try {
//         const city = await City.find()
//         res.json(city)
//     } catch (e) {
//         res.status(500).json(e)
//     }
// }

// module.exports.remove = async (req, res) => {
//     try {
//         const city = await City.deleteOne({_id: req.body.id})
//         res.json({ message: `City deleted`})
//     } catch (e) {
//         res.status(500).json(e)
//     }
// }

// module.exports.searchCity = async (req, res) => {
    
//     try {
//         const city = await City.findOne({title: req.body.url})
//         res.json(city)
//     } catch (e) {
//         console.log(400)
//         res.status(400).json(e)
//     }
// }   