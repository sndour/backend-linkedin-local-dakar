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

exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: "Cet utilisateur n'existe pas dans notre base de donnée."
                });
            }
            bcrypt.compare(req.body.password, user.mdp).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe Incorrect'
                        });
                    }
                    const token = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' });
                    res.status(200).json({
                        //userId: user._id,
                        message: 'login reussi',
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: 'hmm'
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: 'nope'
            });
        }
    );
    
}