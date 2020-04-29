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

module.exports.login = async(req, res) => {
    if (typeof(req.body.login) === 'string' &&
        typeof(req.body.password) === 'string'
    ) {
        const candidate = await User.findOne({ login: req.body.login })

        if (candidate) {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)

            if (isPasswordCorrect) {

                log.info('Успешная авторизация в админской панели');

                const token = jwt.sign({
                    login: candidate.login,
                    userId: candidate._id
                }, keys.JWT, { expiresIn: 60 * 60 })
                res.json({ token })
            } else {
                log.warn('Неудачная попытка авторизации');
                res.status(402).json({
                    message: 'The data you entered is not correct'
                })
            }
        } else {
            log.warn('Неудачная попытка авторизации');
            res.status(402).json({
                message: 'The data you entered is not correct'
            })
        }
    } else {
        log.warn(`Ошибка авторизации. Данные не прошли валидацию!`);
        res.status(500).json('Error server. Data did not pass verification')
    }

}