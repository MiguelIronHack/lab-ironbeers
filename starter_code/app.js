const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beer => {
      console.log(beer);
      res.render('randomBeer', { beer: beer[0] });
    })
    .catch(err => {
      console.error(err);
    });
});

hbs.registerPartials(__dirname + '/views/partials');

// app.get('/beers', (req, res) => {
//   res.render('beers.hbs');
// });
// app.get('/random', (req, res) => {
//   res.render('random.hbs');
// });

app.listen(3010);
