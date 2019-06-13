const Paiement = require('../models/paiement');
const fetch = require('node-fetch');


exports.payit = (req, res, next) => {
    console.log(req.body);
    let price;
    if (req.body.offer_id === 1) {
        price = 20000;
    } else {
        price = 30000;
    }
    const paiement = new Paiement({
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        tel: req.body.tel,
        price: price,
        paid: false
    });
    paiement.save().then(
        (paiement) => {
            console.log(paiement);


    let paymentRequestUrl = "https://payexpresse.com/api/payment/request-payment";
   // http client
    let params = {
    item_name:"Ticket",
    item_price:paiement.price,
    currency:"XOF",
    ref_command:paiement._id,
    command_name:"Paiement Linkedin Local Dakar via PayExpresse",
    env:"test",
    ipn_url:"https://linkedinlocal.com/ipn",
    success_url:"https://linkedinlocaldakar.com",
    cancel_url:"https://linkedinlocaldakar.com",
    custom_field:JSON.stringify({
       custom_fiel1:"value_1",
       custom_fiel2:"value_2",
    })
    };

    let headers = {
    Accept: "application/json",
    'Content-Type': "application/json",
    API_KEY:"bc92c04b8d2cadaa245bad9f4931aee0f6c5735c4ce5b409e5534314d58cc6b0",
    API_SECRET:"51d161b68d4d047c354f8906e2d6c9df72bf33f4758d64d900d8ba595a78cf92",
    };

    fetch(paymentRequestUrl, {
    method:'POST',
    body:JSON.stringify(params),
    headers: headers
    })
    .then(function (response) {
 
    return response.json()
    
    })
    .then(function (jsonResponse) {

        jsonResponse["redirectUrl"]="https://www.payexpresse.com/payment/checkout/"+jsonResponse.token;

    //jsonResponse["redirect_url"]="https://www.payexpresse.com/payment/checkout/"+jsonResponse.token;
    console.log(jsonResponse);

   
    /*
    {
        "success":1,
        "redirect_url":"https://preview.payexpresse.com/payment/checkout/98b1c97af00c8b2a92f2",
      token:"98b1c97af00c8b2a92f2"}

    */

   res.status(201).json({
    jsonResponse
});
    })


        }
    ).catch((error) => {
        res.status(400).json({
            error: error
        });
    })

};

exports.checkout = (req, res, next) =>{
    console.log(req.body.checkoutUrl);
    let headers1 = {
        Accept: "text/html",
        'accept': "text/html"
        };
        //checkoutUrl = "https://preview.payexpresse.com/payment/checkout/"+jsonResponse.token;
        fetch(req.body.checkoutUrl, {
            method:'GET',
            headers: headers1
            }).then((response)=>{
                console.log(response);
                res.status(201).json({
                    response 
                });
            })

}


exports.ipn = (req, res, next) => {
    console.log('notification');
    let type_event = req.body.type_event;
    let custom_field = JSON.parse(req.body.custom_field);
    let ref_command = req.body.ref_command;
    let item_name = req.body.item_name;
    let item_price = req.body.item_price;
    let devise = req.body.devise;
    let command_name = req.body.command_name;
    let env = req.body.env;
    let token = req.body.token;
    let api_key_sha256 = req.body.api_key_sha256;
    let api_secret_sha256 = req.body.api_secret_sha256;

    let my_api_key = 'bc92c04b8d2cadaa245bad9f4931aee0f6c5735c4ce5b409e5534314d58cc6b0';
    let my_api_secret = '51d161b68d4d047c354f8906e2d6c9df72bf33f4758d64d900d8ba595a78cf9';

    if(SHA256Encrypt(my_api_secret) === api_secret_sha256 && SHA256Encrypt(my_api_key) === api_key_sha256)
    {
        //from PayExpresse
        console.log('ok');
    }
    else{
        //not from PayExpresse
        console.log('not ok du toutu');
    }
     
}