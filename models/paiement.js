const mongoose = require('mongoose');


const payementSchema = mongoose.Schema({
    nom: {type: String},
    prenom: {type: String},
    email: {type: String},
    price: {type: Number},
    paid: {type: Boolean}
});


module.exports = mongoose.model('Payement', payementSchema);