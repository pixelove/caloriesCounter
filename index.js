const config = require('./config');
const registerRoutes = require('./routes');
const express = require('express');
const hbs = require('hbs');

const bodyParser = require('body-parser');
// zainicjuj express.js
const app = express();

// dodaj parsowanie danych
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// zainicjuj handlebars
hbs.registerPartials(config.paths.partials);
app.engine('hbs', hbs.__express);
app.set('view engine', 'hbs');

// zarejestruj ścieżki
registerRoutes(app);

// start aplikacji
app.listen(config.port, function () {
  console.log('Listening on port', config.port);
});
