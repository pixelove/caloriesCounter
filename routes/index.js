const express = require('express');

function registerRoutes(app) {
  app.use('/public', express.static('public'));
  app.get('/', require('./displayDay'));
  app.post('/addFood', require('./addFood'));
  }

module.exports = registerRoutes;
