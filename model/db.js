// 此模块用于连接mongodb数据库
let mongoose = require("mongoose");
const DB = mongoose.connect("mongodb://localhost/shop",{ useNewUrlParser: true, useUnifiedTopology: true });
DB.then(()=>{
    console.log("连接成功...");
},()=>{
    console.log("连接失败...")
})




