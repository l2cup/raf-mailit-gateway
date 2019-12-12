const jwt = require('jsonwebtoken');
require('dotenv').config();


const { SECRET } = process.env;

function authorize(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('Unathorized');
    return;
  }
  try {
    jwt.verify(req.headers.authorization, SECRET);
    next();
  } catch (err) {
    res.status(403).send('Forbidden');
  }
}

function makeToken(id) {
  return jwt.sign({ id }, SECRET, { expiresIn: 86400 });
}

module.exports = { authorize, makeToken };
