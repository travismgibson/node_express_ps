var express = require('express');
var authRouter = express.Router();
var assert = require('assert');
var passport = require('passport');

var router = function (db) {
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
                failureRedirect: '/'
            }),
            function (req, res) {
                res.redirect('/auth/profile');
            });


    authRouter.route('/signUp')
        .post(function (req, res) {
            var user = {
                username: req.body.username,
                password: req.body.password
            };

            console.log('>>>>>>>>>>>>>>>> Adding user to DB:' + user.userName);

            db.collection('users').insert(user,
                function (err, results) {
                    assert.equal(err, null);
                    console.log('>>>>>>>>>>>>>>>> User ADDED:' + JSON.stringify(results));
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });
                }
            );
        });

    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;