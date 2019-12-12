const express = require('express');
const users = require('./users.js');

const router = express.Router();

router.post('/login', users.login);

router.post('/register', users.register);

router.get('/me/:username', users.getUserInformation);

router.get('/me/:username/subscriptions', users.getUserSubscriptions);

router.post('/me/:username/subscriptions', users.postUserSubscriptions);

module.exports = router;
