var mongoose = require('mongoose');
var commons = require('../commons');

getModel = function (model) {
    return mongoose.model(model)
};

exports.all = function (req, res, next, model) {
    var Model = getModel(model);
    Model.find().exec().then(function (data) {
        res.json({
            success: true,
            results: data
        });
    }).catch(function (err) {
        next(err);
    });
};

exports.one = function (req, res, next, model) {
    var Model = getModel(model);
    Model.findById(req.params.id).exec().then(function (data) {
        res.json({
            success: true,
            results: data
        });
    }).catch(function (err) {
        next(err);
    });
};

exports.count = function (req, res, next, model) {
    var Model = getModel(model);
    Model.count().exec().then(function (data) {
        res.json({
            success: true,
            results: data
        });
    }).catch(function (err) {
        next(err);
    })
};

exports.create = function (req, res, next, model) {
    var Model = getModel(model);
    Model.create(req.body).then(function (data) {
        res.json({
            success: true,
            results: data
        });
    }).catch(function (err) {
        next(err);
    });
};

exports.update = function (req, res, next, model) {
    var Model = getModel(model);
    Model.findByIdAndUpdate(req.params.id, req.body).then(function () {
        Model.findById(req.params.id).then(function (data) {
            res.json({
                success: true,
                results: data
            });
        })
    }).catch(function (err) {
        next(err);
    });
};

exports.delete = function (req, res, next, model) {
    var Model = getModel(model);
    Model.findByIdAndRemove(req.params.id, req.body).then(function () {
        res.json({
            success: true
        })
    }).catch(function (err) {
        next(err);
    });
};

exports.paginate = function (req, res, next, model, conditions) {
    var conds = conditions || {};
    var Model = getModel(model);
    limit = parseInt(req.query.limit);
    page = parseInt(req.query.page) - 1;

    Model.find(conds, {score: {$meta: "textScore"}}).skip(limit * page).limit(limit).exec().then(function (data) {
        Model.count(conds).exec().then(function (count) {
            res.json({
                success: true,
                limit: limit,
                page: page + 1,
                total: count,
                pages: parseInt((count / limit) + 1),
                results: data
            });
        })
    }).catch(function (err) {
        next(err);
    })
};

exports.getModel = getModel;