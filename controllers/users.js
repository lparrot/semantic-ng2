var genericController = require('./abstract/generic-controller');
var model = 'User';

exports.all = function (req, res, next) {
    genericController.all(req, res, next, model);
};

exports.paginate = function (req, res, next) {
    genericController.paginate(req, res, next, model);
};

exports.one = function (req, res, next) {
    genericController.one(req, res, next, model);
};

exports.count = function (req, res, next) {
    genericController.count(req, res, next, model);
};

exports.create = function (req, res, next) {
    genericController.create(req, res, next, model);
};

exports.update = function (req, res, next) {
    genericController.update(req, res, next, model);
};

exports.delete = function (req, res, next) {
    genericController.delete(req, res, next, model);
};

exports.search = function (req, res, next) {
    var textToSearch = req.query.search && req.query.search.trim() != '' ? {$text: {$search: req.query.search, $caseSensitive: false}} : {};
    genericController.paginate(req, res, next, model, textToSearch);
};