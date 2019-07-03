const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.useradd = (req, res, next) => {

    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
                confirmed: false
            });
            user.save().then(
                ()=> {

                    res.status(201).json({
                        message: 'Utilisateur créé'
                    });
                    Email.confimation(req.body.email, user._id, bodyz);
                }
                    ).catch(
                (error) => {
                    res.status(401).json({
                        error: 'Un utilisateur utilise déjà cette adresse email.'
                    });
                });
            })
}

exports.getuser = (req, res, next) => {
    
}