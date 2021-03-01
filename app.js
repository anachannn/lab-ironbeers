const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    console.log(beersFromApi);
    res.render('beers.hbs', {list : beersFromApi})
  })
  
  .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(responseFromApi => {
      console.log(responseFromApi)
      res.render('random-beer.hbs', {beer : responseFromApi})
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('ready @ http://localhost:3000'));