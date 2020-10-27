//body-parser这个模块的作用是，接收表单通过post发送的文本数据  enctype="application/x-www-form-urlencoded"
let bodyParser = require('body-parser');
let path = require("path");
let querystring = require("querystring");

let express = require("express");
let app = new express();

let ejs = require("ejs");

// 连接数据库
require("./model/db");
let goods = require("./model/goods");
// 登录模块
let uLogin = require("./model/login");
// console.log(addgoods)
//使用body-parser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())  //将表单数据解析成json格式


app.engine('html',ejs.__express);//注册 html 模板引擎
app.set('view engine', 'html');//配置模板引擎为html

// 配置模板引擎
// app.set("view engine","ejs");
// 配置模板所在目录
app.set("views",__dirname+"/views");
// 配置静态文件路径
app.use(express.static("public"));


// 配置路由
app.get("/index",function(req,res){
    
    goods.find().then((result)=>{
        console.log(result);
        res.render("index",{goods:result});
    })
})
// 拦截
// app.use(function(req,res,next){
//     // let userId = localStorage.getItem("userId");
//     // console.log(userId);
//     // if(userId){

//     // }
// })
app.get("/",function(req,res){
    console.log(app.locals);
    res.render("login");
})
app.post("/login",function(req,res){
    uLogin.find(req.body).then((result)=>{
        // console.log(result);
        if(result.length == 0){
            console.log("您的用户不存在，请重新输入");
        }else{
            console.log("登录成功");
            // localStorage.setItem("userId",req.body._id);

            
            res.redirect("/index");
        }
    })
})

app.get("/lll",(req,res)=>{
    app.locals.username="123456"
    res.send("ok")
})
// 添加商品
app.post("/addGoods",(req,res)=>{
    // 添加数据
    goods.create(req.body).then((result)=>{
        res.redirect("/index");
    })
});


// 修改商品
app.get("/updateGoods",(req,res)=>{
    console.log(req.query.id);
    goods.find({"_id":req.query.id}).then((result)=>{
        console.log(result)
        let obj = {}
        res.render("update",{
            u_goods:result[0]
        });
    })
})
// 提交修改操作
app.post("/goodsUpdate",(req,res)=>{
    goods.updateOne({"_id":req.query.id},req.body).then((result)=>{
        console.log(result);
        res.redirect("/index");
    })
})
// 删除商品
app.get("/deleteGoods",(req,res)=>{
    // 通过query获取get提交的数据
    console.log(req.query);
    goods.findOneAndDelete({"_id":req.query.id}).then((result)=>{
        res.redirect("/index");
    })
    
})
// 查找商品
app.get("/findGoods",(req,res)=>{
    let goodsName = path.basename(req.url).split("?")[1].split("=")[1];
    // 解码
    goodsName = querystring.unescape(goodsName);
    goods.find({name:goodsName}).then((result)=>{
        // console.log(result);
        res.render("index",{goods:result});
    })
})



// 监听
app.listen(3000,()=>{
    console.log("3000running...,请访问http://192.172.1.33:3000")
})