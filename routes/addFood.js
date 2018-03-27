const _ = require('lodash');
const MongoModels = require('../models/mongo');
const ObjectId = require('mongodb').ObjectId;

function addFood(req,res) {
  const payload = req.body;
  console.log(payload);
  let dayRequested = payload.Day;
  let mealRequested = payload.Meal;

  MongoModels.Diary.find({"day": dayRequested}, function (err, r) {
    // r === result.
    // zbieram konkretny posiłek
    let selectedDay = r[0];
    let selectedMeal = (selectedDay[mealRequested]);
    console.log(selectedMeal);
    let newProduct = {
      "id" : ObjectId(payload.Product),
      "grams" : parseInt(payload.Weight)
    };

// zmodyfikowany lunch
    selectedMeal.push(newProduct);
// znowu wracam ze zmodyfikowanycm lunchem do obiektu
    selectedDay[mealRequested] = selectedMeal;

    MongoModels.Diary.upsertOne({"_id": selectedDay._id}, {$set: selectedDay},function (err, r) {
      let response = {"status": "ok"};
      res.json(response);
    });
  });
};

module.exports = addFood;
