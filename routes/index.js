var portfolioJSON = require('../portfolio.json');

/* GET home page. */
exports.home = function(req, res) {
//  res.send("This is a server response on the home page");
  var movies = portfolioJSON.movies;

  res.render('index.html');
  // res.render('home', {
  //   movies : movies,
  //   title : 'Jacob J. Zhang | Portfolio Website'
  // });  
};

// For Portfolio Item
// exports.portfolio_single = function(req, res) {
//   var item_number = req.params.item_number;
//   var movies = portfolioJSON.movies;
  
//   res.render('portfolio_item', {
//     movies : movies,
//     title : movies[item_number-1].title
//   });
// };

// // For Portfolio Data
// exports.portfolio_data = function(req, res) {
//   res.send(portfolioJSON);
// };

  


