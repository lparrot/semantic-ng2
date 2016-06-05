var jwt = require("jsonwebtoken");
var server = require("../../server");

module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers[server.conf.token_header_id] || req.headers[server.conf.token_header_id.toLowerCase()] || req.headers[server.conf.token_header_id.toUpperCase()];
    if (token) {
        jwt.verify(token, server.conf.secret_key, function (err, decoded) {
            if (err) {
                return next(err);
            } else {
                req.decoded = decoded;
                req.decoded.password = undefined;
                next();
            }
        });
    } else {
        return next("Please send a token.");
    }
};