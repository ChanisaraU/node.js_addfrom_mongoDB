var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('products mintmint');
  });
  router.get('/add', function(req, res, next) {
    res.send('add products');
  }); 
  router.get('/delete', function(req, res, next) {
    res.send('delete products');
  });
  router.get('/edit', function(req, res, next) {
    res.render('products'); //เรียกใช้ไฟล์จาก views
  });
  module.exports = router;
  