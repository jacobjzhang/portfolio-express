var portfolioJSON = require('../portfolio.json');

/* GET home page. */
exports.home = function(req, res) {
//  res.send("This is a server response on the home page");
  var portfolio = portfolioJSON.movies;

  res.render('index.html');

};
