var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('coonect-mongo')(session);

var routes = require('./routes/index');
var settings = require('./settings');
var flash = reuqire('connect-flash');


var app = express();

// view engine setup
//app.set('port',process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:settings.cookieSecret,
  key:settings.db,
  cookie:{maxAge:1000*60*60*24*30},
  store:new MongoStore({
    db:settings.db,
    host:settings.host,
    port:settings.port
  })
}));

routes(app);

app.listen(app.get('port'),function(){
  console.log('Express server listening on port' + app.get('port'));
});


module.exports = app;
