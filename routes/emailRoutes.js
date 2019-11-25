const nodemailer = require('nodemailer');
// const cors = require('cors');

module.exports = (app) => {
    // function generateTextboxFields(strings, ...values) {
    //     let str = '<div style="display: table-cell;">';
    //     let counter = 1;

    //     strings.forEach((string, i) => {
    //         if (counter == 6) {
    //             str = str + `</div><div style="display: table-cell;">`;
    //             counter = 1;
    //         }

    //         if (values[i] == true) {
    //             str = str + `<input type="checkbox" checked disabled />` + string + `<br/>`;
    //         } else {
    //             str = str + `<input type="checkbox" disabled />` + string + `<br/>`;
    //         }
    //         counter++;
    //     });

    //     str = str + `</div>`;
    //     console.log(str);

    //     return str;
    // }

    // TODO - find out why this version did not work with cors
    // cors(),
    app.post('/email/sendform', (req, res, next) => {
        const htmlEmail = ` 
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Demystifying Email Design</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body style="margin:0; padding:0;">
                <table align='center' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>
                    <tr>
                        <td align='center' bgcolor='#212529' style='padding: 40px 0 20px 0;'>
                            <h3 style='color: #f05f40; font-family: Arial, sans-serif; font-size: 24px; line-height: 20px;'>STREAMLINE WIRING</h3>
                        </td>
                    </tr>

                    <tr>
                        <td bgcolor='#ffffff' style='padding: 30px 20px 30px 20px;' width='100%'>
                            <table cellpadding='0' cellspacing='0' width='100%'>
                                <tr>
                                    <td align='center'>
                                        <h2>Contact Information</h2>
                                    </td>
                                </tr>

                                <tr>
                                    <td bgcolor='#e0e0eb'>
                                        <table width='100%'>
                                            <tr>
                                                <td width='50' valign='top'>
                                                    Name:
                                                </td>
                                                <td valign='top'>${req.body.name}</td>
                                                <td style='font-size: 0; line-height: 0;' width='20'>
                                                    &nbsp;
                                                </td>
                                                <td width='50' valign='top'>
                                                    Phone:
                                                </td>
                                                <td valign='top'>${req.body.phone}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td bgcolor='#e0e0eb'>
                                        <table width='100%'>
                                            <tr>
                                                <td width='50' valign='top'>
                                                    Email:
                                                </td>
                                                <td valign='top'>${req.body.email}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align='center'>
                                        <h2>Property Details</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor='#e0e0eb'>
                                        <table width='100%'>
                                            <tr>
                                                <td width='150' valign='top'>
                                                    Bidding Deadline:
                                                </td>
                                                <td valign='top'>${req.body.biddingDeadline}</td>
                                                <td style='font-size: 0; line-height: 0;' width='20'>
                                                    &nbsp;
                                                </td>
                                                <td width='150' valign='top'>
                                                    Number of Units:
                                                </td>
                                                <td valign='top'>${req.body.numberOfUnits}</td>
                                            </tr>
                                            <tr>
                                                <td width='150' valign='top'>
                                                    Site-Building Phase(s):
                                                </td>
                                                <td valign='top'>${req.body.sitePhases}</td>
                                                <td style='font-size: 0; line-height: 0;' width='20'>
                                                    &nbsp;
                                                </td>
                                                <td width='150' valign='top'>
                                                    Number of IDFs:
                                                </td>
                                                <td valign='top'>${req.body.numberOfIDFs}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align='center'>
                                        <h2>Message</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor='#e0e0eb'>
                                        <p valign='top' style='white-space: pre-wrap'>
                                            ${req.body.message}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align='center' bgcolor='#212529' style='padding: 5px 0 5px 0;'>
                            <p style='color: #f05f40; font-family: Arial, sans-serif; font-size: 12px; line-height: 20px;'> &copy; ${new Date().getFullYear()} Copyright: streamlinewiring.com</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html> 
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
