
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: false }));

app.get('/email/cors', (req, res, next) => {
    res.json({msg: 'This is CORS-enabled for all origins!'});
});

app.post('/email/sendform', (req, res, next) => {
    
    const htmlEmail = ` 
        <h3>Construction Contact Request</h3> 
        <ul>
            <li>Name: ${req.body.firstName} ${req.body.lastName}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <div>
            Building Type: ${req.body.buildingTypes}
        </div>
        <div>
            Number of Units: ${req.body.numberOfUnits}
        </div>
        <div>
            Number of Floors: ${req.body.numberOfFloors}
        </div>

        <h3>Questions in reference to<h3>
        <p>
            CAT5: ${req.body.c1}
        </p>
        <p>
            Description: ${req.body.description}
        </p>
        `

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
        subject: 'Construction inquiry', // Subject line
        text: req.body.message, // plain text body
        html: htmlEmail // html body
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log('Envelope: %s', info.envelope);
            console.log('MessageId: %s', info.messageId);
            res.status(200).json({ "msg": "Message has been sent" });
        }
        return res.end();
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});