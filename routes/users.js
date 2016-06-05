var router = require('express').Router();
var users = require('../controllers/users');
var tokenVerify = require('../controllers/utils/token_verify');

router.get('/users', tokenVerify, users.all);
router.get('/users/count', users.count);
router.get('/users/paginate', tokenVerify, users.paginate);
router.get('/users/search', tokenVerify, users.search);
router.get('/users/:id', tokenVerify, users.one);
router.post('/users', tokenVerify, users.create);
router.put('/users/:id', tokenVerify, users.update);
router.delete('/users/:id', tokenVerify, users.delete);

module.exports = router;