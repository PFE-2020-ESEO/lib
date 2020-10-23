//////////////////////////////
//                          //
// Set all the requirements //
//                          //
//////////////////////////////

const TelegramBot = require('node-telegram-bot-api');
var weather = require('weather-js');
var nodemailer = require('nodemailer');


////////////////////////////////////
//                                //
// Instantiate all the parameters //
//                                //
////////////////////////////////////

const mail = {
    "email" : "contact@actics.ovh",
    "password" : "contact@actics.ovh",
    "host":"ssl0.ovh.net",
    "port":587
}

const telegram = {
    "adminId" : [
        "501762868" // julien
        // "243096262" // paul
    ]
}
// replace the value below with the Telegram token you receive from @BotFather
const tokenTelegram = '1152629617:AAHJk_ThILBGinoC8vqxrgjcK3XDLZa27s4';
const botTelegram = new TelegramBot(tokenTelegram, {polling: true});


///////////////////////
//                   //
// Create the module //
//                   //
///////////////////////


exports.sendMail = (user,obj,text) => {

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

exports.sendTelegram = (userId,text) => {
    botTelegram.sendMessage(userId, text);
}

exports.sendTelegramToAdmin = (text) => {
    telegram.adminId.forEach(user => {
        botTelegram.sendMessage(user, text);
    });
}
