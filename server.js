var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var conf = require('./conf/conf-' + app.get('env'));

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors({allowedHeaders: 'x-access-token, Accept, Content-Type, Authorization'}));

// expose node_modules to client app
app.use(express.static('./public'));
app.use(express.static("./node_modules/"));
app.use('/app', express.static("./app/"));
app.use('/src', express.static("./src/"));
app.use('/build', express.static("./build/"));

var modelList = fs.readdirSync(conf.models_directory).map(function (model) {
    return _.replace(model, '.js', '')
});
var fileList = fs.readdirSync(conf.routes_directory).map(function (route) {
    return _.replace(route, '.js', '')
});

modelList.forEach(function (model) {
    require(conf.models_directory + '/' + model)
});
fileList.forEach(function (route) {
    app.use(conf.routes_prefix, require(conf.routes_directory + '/' + route))
});

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Page introuvable');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            success: false,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        error: err
    });
});

mongoose.connect(conf.mongodb_url, function (err) {
    if (err) {
        console.log('MongoDB => Connection error : ' + err);
    } else {
        console.log('MongoDB => Connection success.');
        var server = app.listen(process.env.PORT || conf.port, function () {
            console.log('NodeJS => Listening server on port ' + server.address().port);
            exports.server = server;
            exports.conf = conf;
        });
    }
});