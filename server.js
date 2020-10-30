//body-parser这个模块的作用是，接收表单通过post发送的文本数据  enctype="application/x-www-form-urlencoded"
let bodyParser = require('body-parser');
let path = require("path");
let querystring = require("querystring");

let express = require("express");
let app = new express();

let ejs = require("ejs");

// 连接数据库
require("./model/db");

// console.log(addgoods)
//使用body-parser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())  //将表单数据解析成json格式


// app.engine('html',ejs.__express);//注册 html 模板引擎
// app.set('view engine', 'html');//配置模板引擎为html

// 配置模板引擎
app.set("view engine","ejs");
// 配置模板所在目录
app.set("views",__dirname+"/views");
// 配置静态文件路径
app.use(express.static("public"));

let router = require("./route/admin.js");

app.use("/admin",router);





// 监听
app.listen(3000,()=>{
    console.log("3000running...,请访问http://192.172.1.33:3000")
})