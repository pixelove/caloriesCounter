const express = require('express');
const MongoModels = require('../models/mongo');

function registerRoutes(app) {
  app.use('/public', express.static('public'));

  app.get('/', function (req, res) {
    MongoModels.Diary.find({}, function (err, r) {
      const data = {
        diary: JSON.stringify(r)
      };
      res.render('pages/home', data);
    });
  });
}

module.exports = registerRoutes;
