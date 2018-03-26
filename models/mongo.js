const config = require('../config');
var MongoClient = require('mongodb').MongoClient;
var url = config.mongoUrl;

function _getClient(callback) {
  MongoClient.connect(url, function(err, db) {
    if (err || !db) {
      console.log('Couldn\'t connect to Mongo at ' + url);
      if (err) {
        console.error(err);
      }
      return callback(err);
    }
    // console.log('Connected correctly to server');
    return callback(null, db)
  });
}

function createMongoModelForCollection(collection) {
  if (typeof collection !== 'string') {
    console.error('Collection name must be a string')
    return null;
  }

  const Model = {
    count: function count(data, callback) {
      _getClient(function(error, db) {
        const col = db.collection(collection);

        col.count(data, function(err, r) {
          // console.log(r.upsertedId._id);
          db.close();
          return callback(err, r);
        });
      });
    },

    insert: function insert(data, callback) {
      _getClient(function(error, db) {
        const col = db.collection(collection);

        col.insert(data, function(err, r) {
          // console.log(r.upsertedId._id);
          db.close();
          return callback(err, r);
        });
      });
    },

    upsertOne: function upsertOne(queryWhere, querySet, callback) {
      _getClient(function(error, db) {
        const col = db.collection(collection);

        col.updateOne(queryWhere, querySet, {
          upsert: true
        }, function(err, r) {
          // console.log(r.upsertedId._id);
          db.close();
          return callback(err, r);
        });
      });
    },

    findOne: function findOne(query, callback) {
      _getClient(function(e, db) {
        var col = db.collection(collection);

        col.find(query).limit(1).toArray(function(err, reply) {
          db.close();
          return callback(err, (
            reply && reply.length
            ? reply[0]
            : null));
        });
      });
    },

    find: function find(query, callback) {
      _getClient(function(e, db) {
        var col = db.collection(collection);

        col.find(query).toArray(function(err, reply) {
          db.close();
          return callback(err, reply);
        });
      });
    },

    deleteOne: function deleteOne(query, callback) {
      _getClient(function(e, db) {
        var col = db.collection(collection);

        col.deleteOne(query, function(err, reply) {
          return callback(null, reply);
        });
      });
    },

    deleteMany: function deleteMany(query, callback) {
      _getClient(function(e, db) {
        var col = db.collection(collection);

        col.deleteMany(query, {}, function(err, reply) {
          return callback(null, reply);
        });
      });
    }
  };

  return Model;
}

module.exports = {
  Diary: createMongoModelForCollection('diary'),
  Products: createMongoModelForCollection('products')
};
