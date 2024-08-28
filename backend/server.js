// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any other email service
  auth: {
    user: 'thumuvivek2003@gmail.com', // Your email
    pass: 'jnug petr oqww hskp'   // Your email password
  }
});
app.get('/',(req,res)=>{
    res.json({message:"Hello"})
})

app.post('/send-mail', (req, res) => {
    console.log(req.params)
  const { email } = req.body;

  const mailOptions = {
    from: 'thumuvivek2003@gmail.com', // Your email
    to: email,
    subject: 'Test Email',
    html: '<h1>Hello World</h1><p>This is a test email.</p>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    res.json({ message: 'Email sent successfully' });
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
