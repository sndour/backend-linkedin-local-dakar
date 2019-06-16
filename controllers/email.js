const nodemailer = require("nodemailer");
const apiKey= "293b1bf33a3bba3e241954738abae657";
const secretKey="5ce9e849c3a05467188a8cce2f2482af";
const mailjet = require ('node-mailjet')
    .connect(apiKey, secretKey);

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
        to: "stephane.ndour@gmail.com, linkedinlocaldakar@gmail.com", // list of receivers
        subject: sujet, // Subject line
        //ext: , // plain text body
        html: "<b>"+message+"</b><br><br><p>Cet email est envoyé depuis le site web par </p>"+email // html body
       
      }).catch((error) =>{
          console.log(error);
          res.send(error);
      });
      res.json({"email":"ok"});
    
}


exports.emailTicket= (email, code, nom, prenom)=>{
  


  const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
      "Messages":[
          {
              "From": {
                  "Email": "stephane.ndour@gmail.com",
                  "Name": "Linkedin Local Dakar"
              }, 
              "To": [
                  {
                      "Email": email,
                      "Name": "Linkedin Local Dakar"
                  },
              ],
              "Bcc": [
                  {
                      "Email": "linkedinlocaldakar@gmail.com",
                      "Name": "Linkedin Local Dakar"
                  }
              ],
              "Subject": "Confirmation Paiement Linkedin Local Dakar",
              // "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
              // "HTMLPart": `Bonjour `+req.body.email +` S\'il vous plaît, cliquez sur ce lien pour confirmer votre adresse email: <br/><a href="${url}"> ${url} </a>`
              "TemplateID": 875903,
              "TemplateLanguage": true,
              "Subject": "Confirmation Paiement Linkedin Local Dakar",
              "Variables": {   "nom": nom, "prenom": prenom, "code":code }
          }
      ]
  })
request
  .then((result) => {
      console.log(result.body)
  })
  .catch((err) => {
      console.log(err.statusCode)
  })

  
}