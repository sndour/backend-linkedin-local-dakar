const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email: {type: String},
    mdp: {type: String},
});


module.exports = mongoose.model('User', payementSchema);