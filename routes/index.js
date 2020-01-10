const express = require('express');
const auth = require('../auth');
const users = require('./users.js');
const subscriptions = require('./subscriptions.js');

const router = express.Router();

/** Users * */
router.post('/login', users.login);

router.post('/register', users.register);

router.get('/me/:username', auth.authorize, users.getUserInformation);

router.get('/me/:username/subscriptions', auth.authorize, users.getUserSubscriptions);

router.post('/me/:username/subscriptions', auth.authorize, users.postUserSubscriptions);


/** Subscriptions * */
router.get('/crypto/available', auth.authorize, subscriptions.getAllCurrencies);

router.get('/crypto/symbol', auth.authorize, subscriptions.getBySymbol);

router.post('/crypto/subscribe', auth.authorize, subscriptions.subscribe);

router.post('/crypto/unsubscribe', auth.authorize, subscriptions.subscribe);

module.exports = router;
