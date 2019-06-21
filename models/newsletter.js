const mongoose = require('mongoose');


const subscriberSchema = mongoose.Schema({
    email: {type: String}
});


module.exports = mongoose.model('Subscriber', subscriberSchema);