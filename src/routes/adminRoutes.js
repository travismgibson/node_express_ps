var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient
    assert = require('assert');

var books = [
    {
        'title': 'War and Peace',
        'author': 'Rick Riordan',
        'genre': 'fiction',
        'bookId': 656,
        'read': true,
  },
    {
        'title': 'Sophies World : The Greek Philosophers',
        'author': 'Jostein Gaarder',
        'genre': 'fiction',
        'bookId': 24280,
        'read': true,
  },
    {
        'title': 'Lucene in Action, Second Edition',
        'author': 'Michael McCandless',
        'genre': 'IT',
        'read': true,
  }
];
var router = function (navList) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {

            // Connection URL 
            var url = 'mongodb://localhost:27017/libraryApp';

            // Use connect method to connect to the Server 
            mongodb.connect(url, function (err, db) {
                //assert.equal(null, err);
                console.log("Connected correctly to server...");
                var collection = db.collection('books');
                //var collection = db.createCollections('books');
                collection.insertMany(books,
                    function (err, results) {
                        console.log("Inserted books into the libraryApp collection.");
                        res.send(results);
                        db.close();
                    }
                );
            });
        });

    return adminRouter;
};

module.exports = router;