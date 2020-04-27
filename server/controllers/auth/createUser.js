const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const keys = require('../../keys')
const User = require('../../models/user.model')
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: `project-${new Date().getMonth()}.log`,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports.createUser = async(req, res) => {
    const candidate = await User.findOne({ login: req.body.login })

    if (candidate) {
        log.warn('Неудачная попытка создания нового пользователя (пользователь существует)');
        res.status(409).json({
            message: 'Такой пользователь уже существует'
        })
    } else {
        log.info('Создание нового пользователя');
        const salt = bcrypt.genSaltSync(10)
        const user = new User({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, salt)
        })

        await user.save()
        res.status(201).json({ message: 'success' })
    }
}