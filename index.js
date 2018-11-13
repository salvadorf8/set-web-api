
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
        <h3>Property type<h3>
        <div>
            Building Type: ${req.body.buildingTypes}
        </div>
        <div>
            Number of Units: ${req.body.numberOfUnits}
        </div>
        <div>
            Number of Floors: ${req.body.numberOfFloors}
        </div>
        <h3>Services required<h3>
        <ul>
        <li>CAT5/6... cable: ${req.body.c0}</li>
        <li>RG-11 homeruns: ${req.body.c1}</li>
        <li>voice lines: ${req.body.c2}</li>
        <li>3" sleeves: ${req.body.c3}</li>
        <li>1.25" smoothwall innerduct: ${req.body.c4}</li>
        <li>PVC 4" pipes: ${req.body.c5}</li>

        <li>Magnetic locks: ${req.body.c8}</li>
        <li>Electric Strikes: ${req.body.c9}</li>
        <li>Request to Exit: ${req.body.c10}</li>
        <li>Proximity readers: ${req.body.c11}</li>
        <li>Panic bars: ${req.body.c12}</li>

        <li>indoor Dome Cameras: ${req.body.c13}</li>
        <li>Outdoor Dome Cameras: ${req.body.c14}</li>
        <li>License Plate Cameras: ${req.body.c15}</li>
        <li>Elevator Cameras: ${req.body.c16}</li>
        <li>Garage panic box: ${req.body.c17}</li>
        <li>Conduit: ${req.body.c18}</li>

        <li>phone outlets: ${req.body.c6}</li>
        <li>comms enclosure: ${req.body.c7}</li>
        </ul>
        <h3>Details<h3>
        <p>
            ${req.body.description}
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