const _ = require('lodash');
const MongoModels = require('../models/mongo');

function addFood(req,res) {
  console.log(req.body);
  let response = {};
  res.json(response);
};

module.exports = addFood;
