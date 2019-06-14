const nodemailer = require("nodemailer");

exports.sendEmail = (req, res, next) => {
    
    let nom= req.body.nom;
    let email = req.body.email;
    let sujet = req.body.sujet;
    let site = req.body.site;
    let message = req.body.message;

    //let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "in-v3.mailjet.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: '94f175d414e727097d3a09d5c1dc014b', // generated ethereal user
          pass: '6b2458ddd64523b14b3fd12fe1f2c62c' // generated ethereal password
        }
      });

      let info = transporter.sendMail({
        from: '"Linkedin Local Dakar (Le site Web) 👻" ndouradefemi@gmail.com', // sender address
        to: "stephane.ndour@gmail.com, contact@linkedinlocaldakar.com", // list of receivers
        subject: sujet, // Subject line
        //ext: , // plain text body
        html: "<b>"+message+"</b><br><br><p>Cet email est envoyé depuis le site web par </p>"+email // html body
      }).catch((error) =>{
          console.log(error);
          res.send(error);
      });
    if (info.messageId) {
        res.send('ok');
    } else { res.send('erreur')}
    
}