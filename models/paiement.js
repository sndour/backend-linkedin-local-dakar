const mongoose = require('mongoose');


const payementSchema = mongoose.Schema({
    nom: {type: String},
    prenom: {type: String},
    email: {type: String},
    tel: {type: Number},
    price: {type: Number},
    paid: {type: Boolean},
    created: {type: Date},
    modified: {type: Date}
});


module.exports = mongoose.model('Payement', payementSchema);