const express = require('express');
const imageRoutes = require('./routes/imageRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/images', imageRoutes);

app.use(errorHandler);

module.exports = app;