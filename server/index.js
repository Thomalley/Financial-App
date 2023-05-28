const express = require('express');
const path = require('path');

// dotenv
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure routes
const routes = require('./routes');

// Configure API
app.locals.api = require('./config/api');

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port:', port);
});
