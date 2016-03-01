var express = require('express');
var router = express.Router();

/* GET home page. */
exports.home = function(req, res) {
//  res.send("This is a server response on the home page");
  res.render('home', {
    title : "Star Wars Movies",
    movies : ["The First Movie", "The Second Movie", "The Third Movie"]
  });  
};

// For Portfolio Item
exports.portfolio_single = function(req, res) {
  var item_number = req.params.item_number;
  res.send("This is the page for portfolio item " + item_number);
});

module.exports = router;
