const mongoose = require('mongoose') //เชื่อมต่อกับฐานข้อมูล
// const mongo = require('mongodb')
const dbUrl= "mongodb://localhost:27017/BlogDB"; //ในmongoจะสร้างฐานข้อมูลที่ชื่อ BlogDB

mongoose.connect(dbUrl,{
    useNewUrlParser:true
})

const db = mongoose.connection
const Schema = mongoose.Schema
const blogSchema = new Schema({
     id:{
         type: Schema.ObjectId
     },
     topic : {
         type : String,
         required:true,  
     },
     article : {
        type : String,
        required:true,  
    },
     category :{
         type : String,
         required:true,
     } 
 })
 const Blogs = module.exports = mongoose.model("blogs",blogSchema); // ให้ข้อมูลของ blogSchema เป้น blogs
 module.exports.createBlog = function(newBlog,callback){ //ให้หน้าอื่นเรียกใช้ฟังชันชื่อ createBlog เพื่อทำการ export ไปใช้ได้ อย่างหน้า blog.js เรียกใช้ในบรรทัดที่ 20
    newBlog.save(callback)
 }
 module.exports.getBlog = function(data){
    Blogs.find(data) // Blogs จากบรรทัด 28
 }
 module.exports.deleteBlog = function(id,callback){
    Blogs.findByIdAndDelete(id,callback) // Blogs จากบรรทัด 28
 }
 module.exports.editBlog = function(id,callback){
     var query={
        _id:id
     }
    Blogs.findOne(query,callback) // Blogs จากบรรทัด 28
 }
 module.exports.updateBlog = function(data,callback){
     var query={
         _id:data.id
     }
   Blogs.findByIdAndUpdate(query,{
        $set :{
        topic : data.topic,
        article : data.article,
        category : data.category,
        }
    },
    {
        new:true
    }
    ,callback)
}