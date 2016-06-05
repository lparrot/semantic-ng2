const router = require('express').Router();
const commons = require('../controllers/commons');

router.post('/commons/login', commons.login);

module.exports = router;