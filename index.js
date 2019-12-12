const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');
require('dotenv').config();


const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());

app.use('/', router);

app.listen(PORT);
