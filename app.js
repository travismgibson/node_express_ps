var express = require('express');
var  mongoskin = require('mongoskin')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var passport = require('passport')
var session = require('express-session')


var logger = require('morgan')
var db = mongoskin.db('mongodb://localhost:27017/libraryApp', {safe:true})     


var app = express();

var port = process.env.PORT || 5000;
var navList = [{
        Link: '/Books',
        Text: 'Books'
                    },
    {
        Link: '/Authors',
        Text: 'Authors'
                    }];

  
var bookRouter = require('./src/routes/bookRoutes')(navList, db);
var authorRouter = require('./src/routes/authorRoutes')(navList);
var adminRouter = require('./src/routes/adminRoutes')(navList);
var authRouter = require('./src/routes/authRoutes')(db);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.param('books', function(req, res, next, books){
//  console.log("Got here");
//  req.collection = db.collection(books)
//  return next()
//})

// MIDDLEWARE
app.use(express.static('public'));
app.set('views', './src/views');

app.use(cookieParser());
app.use(session({secret: 'library',
                 resave: true,
                 saveUninitialized: true
                }));

require('./src/config/passport')(app,db);



//JADE
//app.set('view engine', 'jade');

//Handlebars
//var handlebars = require('express-handlebars');
//app.engine('.hbs', handlebars({extname: '.hbs'}));
//app.set('view engine', '.hbs');

//EJS
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Authors', authorRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: navList
    })
});

app.listen(port, function (err) {
    console.log('Running server on port: ' + port);
});