const auth = require('../auth');
require('dotenv').config();

const { USERS_URL, SECRET } = process.env;

const adapter = require('./adapter')(USERS_URL);

async function login(req, res, next) {
  try {
    const serviceResponse = await adapter.post(req.path,
      {
        username: req.body.username,
        password: req.body.password,
      });
    if (serviceResponse.data.authorization !== true) {
      res.status(401).send({ auth: false, token: null });
      return;
    }
    const token = auth.makeToken(serviceResponse.data.id, SECRET);
    res.status(200).send({ auth: true, token });
  } catch (err) {
    next();
  }
}

async function register(req, res, next) {
  try {
    const serviceResponse = await adapter.post(req.path, req.body);
    // {
    //  username: req.body.username,
    //  password: req.body.password,
    // email: req.body.email,
    // subscriptions: req.body.subscriptions,
    // subscriptionTime: req.body.subscriptionTime,
    // });

    if (serviceResponse.data.registered !== true) {
      res.status(500).send('Registration failed.');
      return;
    }

    const token = auth.makeToken(serviceResponse.data.id);
    res.status(200).send({ auth: true, token });
  } catch (err) {
    next();
  }
}

async function getUserSubscriptions(req, res, next) {
  try {
    const serviceResponse = await adapter.get(req.path, {
      username: req.params.username,
    });
    if (!serviceResponse.data) {
      res.status(404).send('User not found.');
      return;
    }
    res.status(200).send({ subscriptions: serviceResponse.data });
  } catch (err) {
    next(err);
  }
}

async function postUserSubscriptions(req, res, next) {
  try {
    const serviceResponse = await adapter.post(req.path, {
      username: req.params.username,
      subscriptions: req.body.subscriptions,
    });
    if (!serviceResponse.data) {
      res.status(404).send('User not found');
    }
    res.status(200).send({ user: serviceResponse.data });
  } catch (err) {
    next(err);
  }
}


async function getUserInformation(req, res, next) {
  try {
    const serviceResponse = await adapter.get(req.path, {
      username: req.params.username,
    });
    if (!serviceResponse.data) {
      res.status(404).send('User not found');
    }
    res.status(200).send({ user: serviceResponse.data });
  } catch (err) {
    next(err);
  }
}


module.exports = {
  getUserSubscriptions,
  getUserInformation,
  postUserSubscriptions,
  login,
  register,

};
