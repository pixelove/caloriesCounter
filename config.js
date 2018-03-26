const path = require('path');
const fse = require('fs-extra');

const config = {
  mongoUrl: 'mongodb://localhost:27017/caloriesCounter',
  baseUrl: 'http://localhost:3000',
  port: 3000,
  paths: {
    public: path.join(__dirname, 'public'),
    partials: path.join(__dirname, 'views/partials')
  }
};

module.exports = config;
