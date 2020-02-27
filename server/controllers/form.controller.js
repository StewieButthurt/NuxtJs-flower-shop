const {Router} = require('express')
const validator = require('validator');
const request = require('request');
const nodemailer = require('nodemailer');
const keys = require('../keys')

module.exports.newApplication = async (req, res) => {
    if (!req.body.recaptchaToken) {
        return res.status(400).json({ message: "recaptchaToken is required" });
    } else {
        const verifyCaptchaOptions = {
            uri: "https://www.google.com/recaptcha/api/siteverify",
            json: true,
            form: {
                secret: keys.recaptchaSecret,
                response: req.body.recaptchaToken
            }
        };
        request.post(verifyCaptchaOptions, function (err, response, body) {
            if (err) {
                return res.status(500).json({ message: "oops, something went wrong on our side" });
            }

            if (!body.success) {
                return res.status(500).json({ message: body["error-codes"].join(".") });
            }

            if (res.status(201)) {
                if (validator.isEmail(req.body.email)) {
                    if (validator.isMobilePhone(req.body.phone)) {
                        if (validator.isAlpha(req.body.name) && validator.isAlpha(req.body.title)) {

                            const output = `
                            <div style="background: url('https://i.ibb.co/ZYHDRLq/photo-1528164344705-47542687000d.jpg') right center no-repeat; max-height: 590px; background-size: cover;  min-height: 100vh; width: 100%; padding-top:100px; padding-bottom: 100px;">
                                <div style="background-color: white; color: black; opacity: 0.8; padding-top: 20px; padding-bottom: 40px; margin: 0 auto; width: 90%; max-width: 400px; border-radius: 15px; box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);">
                                    <div style="font-size: 18px; margin-bottom: 10px; text-align: center">Заказ с Odigo</div>
                                    <div style="margin: 0 auto; display: table;">
                                        <div style="text-align: left; padding-top: 20px; display: flex">Имя: <span style="margin-left: 15px">${req.body.name}</span></div>
                                        <div style="text-align: left; padding-top: 20px; display: flex">Почта: <span style="margin-left: 15px">${req.body.email}</span></div>
                                        <div style="text-align: left; padding-top: 20px; display: flex">Телефон: <span style="margin-left: 15px">${req.body.phone}</span></div>
                                        <div style="text-align: left; padding-top: 20px; display: flex">Выбранный город: <span style="margin-left: 15px">${req.body.title}</span></div>
                                    </div>
                                </div>
                            </div>
                            `

                            let smtpTransport;

                            try {
                                smtpTransport = nodemailer.createTransport({
                                    host: 'smtp.mail.ru',
                                    port: 465,
                                    secure: true,
                                    auth: {
                                        user: keys.smtpTransportLogin,
                                        pass: keys.smtpTransportPassword
                                    }
                                });
                            } catch (e) {
                                let message = false;
                                console.log(`error ${e}`)
                            }

                            let mailOptions = {
                                from: 'ckotieika@mail.ru',
                                to: 'nosoff.slawa@yandex.ru',
                                subject: 'Заказ на Odigo',
                                text: 'Заказ на Odigo',
                                html: output
                            };

                            smtpTransport.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(' smtpTransport.sendMail error')
                                } else {
                                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                                    return res.status(200).json({ message: "recaptcha and form ok" });
                                }
                            })
                        } else {
                            return res.status(200).json({ message: "Name error" });
                        }
                    } else {
                        return res.status(200).json({ message: "Phone error" });
                    }
                } else {
                    return res.status(200).json({ message: "Email error" });
                }
            }
        })
         
    }
}