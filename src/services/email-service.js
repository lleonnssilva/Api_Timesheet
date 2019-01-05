'use strict'
var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY)

exports.send = async (to, subject, body) => {
  sendgrid.send({
    to: to,
    from: 'leoguaruleo@gmail.com',
    subject: subject,
    html: body
  })
}

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: to,
//   from: 'leoguaruleo@gmail.com',
//   subject: subject,
//   text: 'and easy to do anywhere, even with Node.js',
//   html: body,
// };
// sgMail.send(msg);
