const nodemailer=require('nodemailer');
require( 'dotenv' ).config();

const {EMAIL,EMAIL_PASSWORD}=process.env;

exports.sendmail = function(voterid,password,email){
    // sending mail here 
    
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: EMAIL, // generated ethereal user
                pass: EMAIL_PASSWORD, // generated ethereal password
                },
            });
            
            // send mail with defined transport object
            let info = transporter.sendMail({
                from: '"noreply here" adisadhu7@gmail.com', // sender address
                to: email, // list of receivers
                subject: "From Voting Portal", // Subject line
                text: "Below are your  voter id and password", // plain text body
                html: `Below are your  voter id and password:
                <p>voter id:<b> ${voterid}</b> <br> password:<b> ${password}</b><br>
                <br>Use this only to login to vote</p>`, // html body
            });
            
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            
}