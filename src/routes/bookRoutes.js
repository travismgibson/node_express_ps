var express = require('express');
var bookRouter = express.Router();

var router = function (navList, db) {
    var bookController = require('../controllers/bookController')(null, navList, db);

    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;

};

module.exports = router;