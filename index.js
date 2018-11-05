

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();




app.use(cors());
app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: false }));


app.post('/email/sendform', (req, res) => {
    console.log(req.body);
    
    
    nodemailer.createTestAccount((err, account) => {
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
            subject: 'React and Redux Technology - nodemailer test', // Subject line
            text: req.body.message, // plain text body
            html: htmlEmail // html body
        }


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    })
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${ PORT }`);
});