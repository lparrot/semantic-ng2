var jwt = require("jsonwebtoken");
var server = require("../server");

exports.login = function (req, res, next) {
    var login = req.body.login;
    var password = req.body.password;
    if (!login || !password) {
        return next("Login and password is required.");
    }
    jwt.sign({login: req.body.login, password: req.body.password}, server.conf.secret_key, {algorithm: "HS512"}, function (err, token) {
        if (err) {
            return next(err);
        } else {
            res.json({
                success: true,
                results: token
            });
        }
    });
};