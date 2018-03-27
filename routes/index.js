const express = require('express');
const _ = require('lodash');
const MongoModels = require('../models/mongo');

function registerRoutes(app) {
  app.use('/public', express.static('public'));

  app.get('/', function (req,res) {
    // const now = new Date;
    // const today = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    // console.log(today);
    const today = "2018-03-26";

    const dayRequested = req.query.day;
    console.log(dayRequested);
    MongoModels.Diary.find({"day": dayRequested || today}, function (err, r) {
      const todayData = r[0];
      if (!todayData) {
        return res.render("pages/error");
      }
      /**
      * todayData = {
      *   day: "2018-03-26",
      *   breakfast: [
      *     {
      *       id: ObjectId,
      *       quantity: 100
      *     }
      *   ]
      * }
      */

      const todayAllIdsBreakfast = _.map(todayData.breakfast, 'id');
      const todayAllIdsLunch = _.map(todayData.lunch, 'id');
      const todayAllIdsDinner = _.map(todayData.dinner, 'id');
      const todayAllIdsSupper = _.map(todayData.supper, 'id');

      const todayDataProductIds = _.concat(todayAllIdsBreakfast, todayAllIdsLunch, todayAllIdsDinner, todayAllIdsSupper);
      /**
       * todayDataProducts = ['5ab9275164678352874fd3d2', '5ab9268488c569479d39aac3'];
       */

      // console.log('todayDataProductIds', todayDataProductIds);

      /**
       * todayDataProducts = [
       * {
            "_id" : ObjectId("5ab9268488c569479d39aac3"),
            "name" : "ziemniak",
            "proteins" : 38,
            "fats" : 12,
            "carbs" : 10,
            "calories" : 50,
            "category" : "vegetable"
          },
          ...
        ]
       */

       MongoModels.Products.find({"_id": {"$in": todayDataProductIds}}, function (err, r) {
         const todayDataProducts = r;
         // console.log('todayDataProducts', todayDataProducts);

         function enrichProductsData(product) {
           // console.log(product);
           const currentProduct = _.find(todayDataProducts, {"_id": product.id});
           // console.log(currentProduct);
           product.name = currentProduct.name;
           product.image = currentProduct.image;
           product.kcal = Math.ceil((currentProduct.calories * product.grams) / 100);
           return product;
         }

         todayData.breakfast = _.map(todayData.breakfast, enrichProductsData);
         todayData.lunch = _.map(todayData.lunch, enrichProductsData);
         todayData.dinner = _.map(todayData.dinner, enrichProductsData);
         todayData.supper = _.map(todayData.supper, enrichProductsData);

           const totalKcal =  _.sum(_.map(todayData.breakfast, 'kcal')) +
           _.sum(_.map(todayData.lunch, 'kcal')) +
           _.sum(_.map(todayData.dinner, 'kcal')) +
           _.sum(_.map(todayData.supper, 'kcal'));


         const data = {
           diary: todayData,
           totalKcal: totalKcal
         };



         res.render('pages/home', data);
       });

    });
  });
}

module.exports = registerRoutes;
