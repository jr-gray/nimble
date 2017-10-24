const router = require('express').Router();
const controller = require('./controller');

router.get('/getData', controller.getData);

module.exports = router;