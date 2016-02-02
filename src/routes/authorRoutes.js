var express = require('express');

var authorRouter = express.Router();

var router = function (navList, db) {
    //console.log('Inside Author');
    authorRouter.route('/')
        .get(function (req, res) {
        res.send('Get money in the Authors');
    });
    return authorRouter;
};

module.exports = router;