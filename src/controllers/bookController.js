var bookController = function (bookService, navList, db) {
    var bookService = require('../services/goodreadsService')();

    var middleware = function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };

    var getIndex = function (req, res, next) {
                        console.log("Calling render 0");

        db.collection('books').find({}).toArray(
            function (err, results) {
                console.log("Calling render 1");
                res.render('bookListView', {
                    title: 'Books',
                    nav: navList,
                    books: results
                });
            }
        );

    };

    var getById = function (req, res, next) {
        var id = req.params.id;

        db.collection('books').findById(id,
            function (err, results) {
                if (results.bookId) {
                    bookService.getBookById(results.bookId,
                        function (err, book) {
                            results.book = book;
                        console.log("Calling render 2");
                            res.render('bookView', {
                                nav: navList,
                                book: results
                            })
                        });
                } else {
                    console.log("Calling render 3");
                    res.render('bookView', {
                        nav: navList,
                        book: results
                    });
                }
            }
        );

    };
    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    };
}
module.exports = bookController;