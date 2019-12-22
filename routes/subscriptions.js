require('dotenv').config();

const { SUBSCRIPTIONS_URL } = process.env;

const adapter = require('./adapter')(SUBSCRIPTIONS_URL);

async function getAllCurrencies(req, res, next) {
  try {
    const serviceResponse = await adapter.get(req.path);
    if (!serviceResponse.data) {
      res.status(500).send('Error fetching subscriptions.');
    }
    res.status(200).send(serviceResponse.data);
  } catch (err) {
    next(err);
  }
}


async function getBySymbol(req, res, next) {
  try {
    const serviceResponse = await adapter.get(req.path, {
      params: req.query,
    });

    if (!serviceResponse.data) {
      res.status(404).send('No such symbol.');
    }
    res.status(200).send(serviceResponse.data);
  } catch (err) {
    next(err);
  }
}

async function subscribe(req, res, next) {
  try {
    const serviceResponse = await adapter.post(req.path, req.body);
    if (!serviceResponse.data) {
      res.status(500).send('Error while subscribing.');
    }
    res.status(200).send(serviceResponse.data);
  } catch (err) {
    next(err);
  }
}

async function unsubscribe(req, res, next) {
  try {
    const serviceResponse = await adapter.post(req.path, req.body);
    if (!serviceResponse.data) {
      res.status(500).send('Error while unsubscribing.');
    }
    res.status(200).send(serviceResponse.data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCurrencies, getBySymbol, subscribe, unsubscribe,
};
