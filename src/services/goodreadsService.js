var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({
    explicitArray: false
});

var goodreadsService = function () {
    //key: LeZDFL1A5RlZgDbOlKPBRQ
    //secret: VCT7639j0Fqcjj2KedbbVDlHiFwaigFMzcn4CnhE0M

    var getBookById = function (id, cb) {
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=LeZDFL1A5RlZgDbOlKPBRQ'
        }

        var callback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                //console.log(str);
                
                parser.parseString(str, function (err, result) {
                    console.log("Authors: " + JSON.stringify(result.GoodreadsResponse.book.authors.author[0].name));
                    cb(null, result.GoodreadsResponse.book);
                });
            });

        };

        http.request(options, callback).end();

    }

    return {
        getBookById: getBookById
    };
}

module.exports = goodreadsService;