module.exports = (req) => {
    return ` 
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
                                                <label style='font-weight: bold'>Name:</label>
                                                <br>
                                                ${req.body.name}
                                            </td>
                                            <td style='font-size: 0; line-height: 0;' width='20'>
                                                &nbsp;
                                            </td>
                                            <td width='50' valign='top'>
                                                <label style='font-weight: bold'>Phone:</label>
                                                <br>
                                                ${req.body.phone}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td bgcolor='#e0e0eb'>
                                    <table width='100%'>
                                        <tr>
                                            <td width='50' valign='top'>
                                                <label style='font-weight: bold'>Email:</label>
                                                <br>
                                                ${req.body.email}
                                            </td>
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
                                                <label style='font-weight: bold'>Bidding Deadline:</label>
                                                <br>
                                                ${req.body.biddingDeadline}
                                            </td>
                                            <td style='font-size: 0; line-height: 0;' width='20'>
                                                &nbsp;
                                            </td>
                                            <td width='150' valign='top'>
                                                <label style='font-weight: bold'>Number of Units:</label>
                                                <br>
                                                ${req.body.numberOfUnits}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width='150' valign='top'>
                                                <label style='font-weight: bold'>Site-Building Phase(s):</label>
                                                <br>
                                                ${req.body.sitePhases}
                                            </td>
                                            <td style='font-size: 0; line-height: 0;' width='20'>
                                                &nbsp;
                                            </td>
                                            <td width='150' valign='top'>
                                                <label style='font-weight: bold'>Number of IDFs:</label>
                                                <br>
                                                ${req.body.numberOfIDFs}
                                            </td>
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
                                    <table>
                                        <tr>
                                            <td width='300'>
                                                <p style='white-space: pre-line'>
                                                    ${req.body.message}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
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
};

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
