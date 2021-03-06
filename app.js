const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();



const paiementRoutes = require('./routes/paiement');
const emailRoutes = require('./routes/email');

//app.use('/views/pages', express.static(path.join(__dirname, 'pages')));
mongoose.connect('mongodb+srv://stephane:wWFowt3RgmzH27ni@cluster0-dirxl.mongodb.net/linkedinlocal?retryWrites=true', { useNewUrlParser: true})
    .then(() => {
        console.log('successfully connected to MongoDB');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.log(error);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, enctype');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', paiementRoutes);

module.exports = app;
