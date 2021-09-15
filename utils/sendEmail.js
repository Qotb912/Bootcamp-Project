const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  console.log('message'.bold,message);
  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;












// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper 
// const sendEmail = async (options)=> { 
//   console.log('start sendEmail Fun'.green);
//   //create reusable transporter object using the default SMTP transport
// //   const transporter = nodemailer.createTransport({
// //     host: process.env.SMTP_HOST,
// //     port: process.env.SMTP_PORT,
// //     secure: true, // true for 465, false for other ports
// //    // requireTLS: true, 
// //    //service: "Gmail",
// //     auth: {
// //       user: process.env.SMTP_EMAIL, // generated ethereal user
// //       pass: process.env.SMTP_PASSWORD, // generated ethereal password
// //     },  
// //   //   tls: { 
// //   //     ciphers:'SSLv2' 
// //   // }
// // });
// //  tls: {rejectUnauthorized: false}

//   // //from web site 
//   // const transporter = nodemailer.createTransport({
//   //   host: "smtp.mailtrap.io",
//   //   port: 2525,
//   //   auth: {
//   //     user: "c59f2e551adc17",
//   //     pass: "09e7f65baf595f"
//   //   }
//   // });

//   console.log('create transpoter in sendEmail Fun'.green);

//   // send mail with defined transport object
//   const message = {
//     from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
//     to: options.email, // list of receivers
//     subject:options.subject, // Subject line
//     text: options.message, // plain text body
//   };
//   console.log(message);
//   console.log('create message in sendEmail Fun'.green);

//   // try {    
//   //   const info = await transporter.sendMail(message);
//   // } catch (err) {
//   //   console.error(err);
//   // console.log('Error in sendEmail Fun'.red);

//   // }
  
//   //console.log("Message sent: %s", info.messageId);

  
// }
// module.exports = sendEmail ;
// // let testAccount = await nodemailer.createTestAccount();
// // //testAccount.smtp.secure = true
// // console.log('test acc:',testAccount);
// // // create reusable transporter object using the default SMTP transport
// // let transporter = nodemailer.createTransport({
// //   host: "smtp.ethereal.email",
// //   port: 587,
// //   secure: false, // true for 465, false for other ports
// //   auth: {
// //     user: testAccount.user, // generated ethereal user
// //     pass: testAccount.pass, // generated ethereal password
// //   },
// //   tls: {rejectUnauthorized: false}

// // });

// // let info = await transporter.sendMail({
// //   from: '"Fred Foo 👻" <foo@gmail.com', // sender address 
// //   to: "bar@example.com, baz@example.com", // list of receivers
// //   subject: "Hello ✔", // Subject line
// //   text: "Hello world?", // plain text body
// // });