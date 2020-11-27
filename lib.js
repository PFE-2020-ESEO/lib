//////////////////////////////
//                          //
// Set all the requirements //
//                          //
//////////////////////////////

const TelegramBot = require('node-telegram-bot-api');
var nodemailer = require('nodemailer');
const { parse } = require('json2csv');

////////////////////////////////////
//                                //
// Instantiate all the parameters //
//                                //
////////////////////////////////////

const mail = {
    "email": "contact@actics.ovh",
    "password": "contact@actics.ovh",
    "host": "ssl0.ovh.net",
    "port": 587
}

const telegram = {
    "adminId": [
        "501762868" // julien
        // "243096262" // paul
    ]
}
// replace the value below with the Telegram token you receive from @BotFather
const tokenTelegram = '1444178058:AAG8flYFGoNPACwIMwLrf45J7urud8b0I3k';
const botTelegram = new TelegramBot(tokenTelegram);


///////////////////////
//                   //
// Create the module //
//                   //
///////////////////////


exports.sendMail = (user, obj, text) => {

    let transporter = nodemailer.createTransport({
        host: mail.host,
        port: mail.port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: mail.email, // generated ethereal user
            pass: mail.password, // generated ethereal password
        },
    });

    let info = transporter.sendMail({
        from: '"Actics 👻" <contact@actics.ovh>', // sender address
        to: user, // list of receivers
        subject: obj, // Subject line
        text: text // plain text body
    });
}

exports.sendMailCSV = (user, obj, text, jsondata) => {

    const transporter = nodemailer.createTransport({
        host: mail.host,
        port: mail.port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: mail.email, // generated ethereal user
            pass: mail.password, // generated ethereal password
        },
    });

    //some data
    const data = jsondata

    const keys = Object.keys(data[0]);
    //conver the data to CSV with the column names
    const csv = parse(data, keys);

    transporter.sendMail(
        {
            from: '"Actics 👻" <contact@actics.ovh>', // sender address
            to: user, // list of receivers
            subject: obj, // Subject line
            text: text, // plain text body,
            // here is the magic
            attachments: [
                {
                    filename: 'file.csv',
                    content: csv
                }
            ]
        },
        (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    );

}





exports.sendTelegram = (userId, text) => {
    botTelegram.sendMessage(userId, text);
}

exports.sendTelegramToAdmin = (text) => {
    telegram.adminId.forEach(user => {
        botTelegram.sendMessage(user, text);
    });
}
