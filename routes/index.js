var express = require('express');
var router = express.Router();
var exchangeRates = require('../model/currencyDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET convert page */
router.get('/convert', function(req, res, next){

  var query = req.query; // Get the URL query string as an object

    console.log(exchangeRates);
    console.log(query);

    // figure out how many dollars to convert
    var dollars = query.dollars;

    // figure out the currency to convert to
    var toCurrency = query.to_currency;

    // figure out the exchange rate ... do some math!
    var exchangeRate = exchangeRates[toCurrency];
    var converted = dollars * exchangeRate;


    // TODO replace this with a response page with the conversion data
    // res.send(dollars + ' in ' + toCurrency + ' is ' + convertedAmount);
    res.render('results', {
      dollars: dollars,
      toCurrency: toCurrency,
      converted: converted}
    );

});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { name: "Kenya"});
});


module.exports = router;
