const express = require('express');
const MongoModels = require('../models/mongo');

function registerRoutes(app) {
  app.use('/public', express.static('public'));

  app.get('/', function (req,res) {
    // const now = new Date;
    // const today = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    // console.log(today);
    const today = "2018-03-26";
    MongoModels.Diary.find({"day": today}, function (err, r) {
      const data = {
        diary: r[0]
      };
      res.render('pages/home', data);
    });
  });
}

module.exports = registerRoutes;
