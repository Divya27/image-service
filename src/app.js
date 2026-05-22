const express = require('express');

const imageRoutes = require('./routes/imageRoutes');
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./swagger');

const app = express();

app.use(express.json());

setupSwagger(app);

app.use('/images', imageRoutes);

app.use(errorHandler);

module.exports = app;