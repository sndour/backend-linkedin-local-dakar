const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.useradd = (req, res, next) => {

    User.find({email: req.body.email}).then(
        (ok) => res.json({message: 'Un utilisateur utilise déjà cette adresse'})
    ).catch(
        () => {
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
                            res.json({
                                messsage: error
                            });
                        });
                    })
        }
    );
    
}

exports.getuser = (req, res, next) => {
    
}