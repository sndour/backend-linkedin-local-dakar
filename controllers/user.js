const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.useradd = (req, res, next) => {

    bcrypt.hash(req.body.mdp, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                mdp: hash,
            });
            user.save().then(
                ()=> {
                    res.status(201).json({
                        message: 'Utilisateur créé'
                    });
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