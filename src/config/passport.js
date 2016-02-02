var passport = require('passport')

module.exports = function (app,db) {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    
    
    passport.deserializeUser(function(user, done){
        //mongo.find
        done(null, user);
    });    
    
    require('./strategies/local.strategy')(db);
    
};