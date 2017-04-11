var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config');

mongoose.Promise = global.Promise;

if (config.has('AppVar.dbConnectionStr')) {
    mongoose.connect(config.get('AppVar.dbConnectionStr'))
        .then(() => console.log('connected to DB'))
        .catch((err) => { console.log(err); process.exit(1); });
} else {
    console.log('No connection string provided exiting...');
    process.exit(1);
}


var book = require('./routes/book');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/book', book);

//404 
app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});
//error handle
app.use(function (err, req, res, next) {
    res.local.message = err.message;
    res.local.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
});
module.exports = app;
