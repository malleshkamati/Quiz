var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'malleshkamati0803@gmail.com',
    pass: 'Mallesh@0803'
  }
});

var mailOptions = {
  from: 'malleshkamati0803@gmail.com',
  to: 'redmiji768@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});