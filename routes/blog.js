var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');
const {check,validationResult} = require('express-validator'); //เพิ่มการเช็คข้อมูล
const blogs = require('../models/blogs');

router.get('/', function(req, res, next) {
  Blogs.getBlog(function(err,blogs){
    if(err) throw err
    res.render('blog',{data :"blog" ,blogs:blogs});
  }); 
});
router.get('/addfrom', function(req, res, next) {
  res.render('addfrom',{data : "เพิ่มบทความ"}); //สับpath ของ blog --> blog/addfrom
});

router.get('/delete/:id', function(req, res, next) {
  // console.log("ส่งค่า ID :",req.params.id);
  Blogs.deleteBlog([req.params.id],function(err,callback) { //ใช้ฟังชัน createBlog
    if(err) throw err ;
    res.redirect("/blog");
    console.log('delete compete');
  }) ;
});

router.get('/edit/:id', function(req, res, next) {
  // console.log("ส่งค่า ID :",req.params.id);
  Blogs.editBlog([req.params.id],function(err,blog) { //ใช้ฟังชัน editBlog เพื่อส่งค่าไป editfrom ,รับค่า blog มาจาก models blogs.js
    if(err) throw err ;
    res.render("editfrom",{data : "แก้ไขบทความ",blog:blog}); 
  }) ;
});

router.post('/update',[
  check('topic', 'ใส่ข้อมูล topic ด้วยจ้า').not().isEmpty(), //เช็คว่าไม่ใช่ค่าว่างนะ
  check('article', 'ใข้อมูล article ด้วยจ้า').not().isEmpty()
],function(req, res, next) {
  const result= validationResult(req);
  var errors = result.errors;
  for (var key in errors) {
    console.log(errors[key].value);
  }
  if (!result.isEmpty()) {
  res.render("blogs",{data : 'เพิ่มบทความ',errors:errors} ) ;
  }
  else {
    data = new Blogs ({
      id : req.body.id,
      topic : req.body.topic,
      article : req.body.article,
      category : req.body.category, 
    }) //จับคู่กับฐานข้อมูล
    Blogs.updateBlog(data,function(err,callback) { 
      if(err) throw err ;
      console.log(err);
      res.redirect("/blog"); //redirect ไปที่หน้าแรกเมื่อบันทึกเสดแล้ว
    }) ;
  }
});

router.post('/addfrom',[
  check('topic', 'ใส่ข้อมูล topic ด้วยจ้า').not().isEmpty(), //เช็คว่าไม่ใช่ค่าว่างนะ
  check('article', 'ใข้อมูล article ด้วยจ้า').not().isEmpty()
],function(req, res, next) {
  const result= validationResult(req);
  var errors = result.errors;
  for (var key in errors) {
    console.log(errors[key].value);
  }
  if (!result.isEmpty()) {
  //response validate data to register.ejs
  res.render("addfrom",{data : 'เพิ่มบทความ',errors:errors} ) ;
  }
  else {
    // console.log(req.body.topic) ;
    // console.log(req.body.article);
    // console.log(req.body.category);  //ค่าที่จะจากfrom ในหน้า addfrom.ejs
    data = new Blogs ({
      topic : req.body.topic,
      article : req.body.article,
      category : req.body.category, // เอาตัวแปลจากหน้า blogs.js คือ category มาจับคู่กับตัวแปลที่รับมาจากหน้า addfrom.ejs แล้งลงฐานข้อมูล
    }) //จับคู่กับฐานข้อมูล
    Blogs.createBlog(data,function(err,callback) { //ใช้ฟังชัน createBlog
      if(err) throw err ;
      console.log(err);
      res.redirect("/blog"); //redirect ไปที่หน้าแรกเมื่อบันทึกเสดแล้ว
    }) ;
  }
});
module.exports = router;

