const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req, res ,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Error');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    welcomeMessage: 'Hi visitor!',
    pageTitle: 'About Page'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
  errorMessage: 'Error Handling this request'});
});

app.listen(port, () => {
  console.log(`Server up is on port ${port}`);
});
