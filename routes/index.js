var portfolioJSON = require('../portfolio.json');

/* GET home page. */
exports.home = function(req, res) {
//  res.send("This is a server response on the home page");
  var movies = portfolioJSON.movies;

  res.render('home', {
    title : "Jacob J. Zhang",
    movies : movies
  });  
};

// For Portfolio Item
exports.portfolio_single = function(req, res) {
  var item_number = req.params.item_number;
  res.send("This is the page for portfolio item " + item_number);
};


