const nodemailer = require('nodemailer');
const cors = require('cors');

module.exports = (app) => {
    console.log('made it here');
    function generateTextboxFields(strings, ...values) {
        let str = '<div style="display: table-cell;">';
        let counter = 1;

        strings.forEach((string, i) => {
            if (counter == 6) {
                str = str + `</div><div style="display: table-cell;">`;
                counter = 1;
            }

            if (values[i] == true) {
                str =
                    str +
                    `<input type="checkbox" checked disabled />` +
                    string +
                    `<br/>`;
            } else {
                str =
                    str +
                    `<input type="checkbox" disabled />` +
                    string +
                    `<br/>`;
            }
            counter++;
        });

        str = str + `</div>`;
        console.log(str);

        return str;
    }

    app.post('/email/sendform', cors(), (req, res, next) => {
        const services = generateTextboxFields`
            CAT5/6 cable${req.body.c0}
            RG-11 homeruns${req.body.c1}
            voice lines${req.body.c2}
            3" sleeves${req.body.c3}
            1.25" smoothwall innerduct${req.body.c4}
            PVC 4" pipes${req.body.c5}
            Magnetic locks${req.body.c8}
            Electric Strikes${req.body.c9}
            Request to Exit${req.body.c10}
            Proximity readers${req.body.c11}
            Panic bars${req.body.c12}
            indoor Dome Cameras${req.body.c13}
            Outdoor Dome Cameras${req.body.c14}
            License Plate Cameras${req.body.c15}
            Elevator Cameras${req.body.c16}
            Garage panic box${req.body.c17}
            Conduit${req.body.c18}
            phone outlets${req.body.c6}
            comms enclosure${req.body.c7}
        `;

        const htmlEmail = ` 
            <div>
                <h2>Construction Contact Request</h2>
                <div>
                    <div><label>Name:</label> ${req.body.firstName} ${req.body.lastName}</div> 
                    <div><label>Email:</label> ${req.body.email}</div> 
                    <div><label>Phone:</label> ${req.body.phone}</div> 
                </div>
                
                <h2>Projected Start Date and Property Details</h2>
                <div style="display: table-cell;">
                    <div><label style="padding-right: 10px;">Start Date:</label>${req.body.projectedDate}</div> 
                    <div><label style="padding-right: 10px;">Building Type:</label> ${req.body.buildingTypes}</div>
                    <div><label style="padding-right: 10px;">Number of Units:</label> ${req.body.numberOfUnits}</div>
                    <div><label style="padding-right: 10px;">Number of Floors:</label>${req.body.numberOfFloors}</div>
                    <div><label style="padding-right: 10px;">Site-Building Phasing:</label> ${req.body.numberOfFloors}</div>
                    <div><label style="padding-right: 10px;">Number of IDF's:</label>${req.body.numberOfFloors}</div>
                </div>
                
                <h2>Services required</h2>
                <div style="display: table-row; width: 100%; border-spacing: 20px 0;">
                    ${services}
                </div>
    
                <h3>Additional Description</h3>
                <div>
                    <p>${req.body.description}</p>
                </div>
            </div>
        `;

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
            subject: 'Construction inquiry', // Subject line
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
