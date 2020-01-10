// const cors = require('cors');
const nodemailer = require('nodemailer');
const contactMeTemplate = require('../services/emailTemplates/contactMeTemplate');

module.exports = (app) => {
    // TODO - find out why adding a middleware (cors()) as a parameter in app.post did not work
    app.post('/email/sendform', (req, res, next) => {
        const htmlEmail = contactMeTemplate(req);

        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER, // generated ethereal user
                pass: process.env.PASSWORD // generated ethereal password
            }
        });

        let mailOptions = {
            from: process.env.USER, // sender address
            to: process.env.USER, // list of receivers
            bcc: process.env.USER2,
            subject: 'STREAMLINE WIRING', // Subject line
            text: req.body.message, // plain text body
            html: htmlEmail // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.json(error);
            } else {
                console.log('Envelope: %s', info.envelope);
                console.log('MessageId: %s', info.messageId);
                res.status(200).json({ msg: 'Message has been sent' });
            }
            return res.end();
        });
    });
};
