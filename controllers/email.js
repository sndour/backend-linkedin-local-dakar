const nodemailer = require("nodemailer");

exports.sendEmail = (req, res, next) => {
    
    let nom= req.body.nom;
    let email = req.body.email;
    let sujet = req.body.sujet;
    let site = req.body.site;
    let message = req.body.message;

    //let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.linkedinlocaldakar.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'contact@linkedinlocaldakar.com', // generated ethereal user
          pass: '@RhDc*k4' // generated ethereal password
        }
      });

      let info = transporter.sendMail({
        from: '"Linkedin Local Dakar (Le site Web) 👻" '+ email, // sender address
        to: "stepĥane.ndour@gmail.com, contact@linkedinlocaldakar.com", // list of receivers
        subject: sujet, // Subject line
        //ext: , // plain text body
        html: "<b>"+message+"</b><br><br><p>Cet email est envoyé depuis le site web.</p>" // html body
      });
    if (info.messageId) {
        res.send('ok');
    } else { res.send('erreur')}
    
}