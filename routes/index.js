var express = require('express');
var router = express.Router();

// GET home page 
router.get('/', function(req, res) {
  res.render('index', { title: 'PadScoper' });
});

// GET about page 
router.get('/about', function(req, res) {
	res.render('about', { title: 'About PadScoper' });
}); 

module.exports = router;
