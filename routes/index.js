var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{data :"อยู่ในหน้า indexs"});
});

module.exports = router;
