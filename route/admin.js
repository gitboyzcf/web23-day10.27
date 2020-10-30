let express = require("express");
let path = require("path");
let querystring = require("querystring");

let app = express();
let router = express.Router();

let goods = require("../model/goods");
// 登录模块
let uLogin = require("../model/login");


// 配置路由
router.get("/",function(req,res){
    res.render("login");
})


router.post("/login",function(req,res){
    uLogin.find(req.body).then((result)=>{
        if(result.length == 0){
            console.log("您的用户不存在，请重新输入");
            res.redirect("/admin");
        }else{
            console.log("登录成功");
            // 存储该用户
            app.locals.userId=result[0]._id; // 定义可以应用整个生命周期中使用的变量
            app.locals.userName = result[0].username;
            res.redirect("/admin/index");
        }
    })
})

// 注册
router.post("/user_register",async (req,res)=>{
    let userObj = req.body;
    let result = await uLogin.create(userObj);
    console.log(result);
    res.redirect("/admin/login");
});

// 拦截---------------
router.use(function(req,res,next){
    let userId = app.locals.userId;
    if(!userId){
        res.render("login");
    }else{
        next();
    }
});

// 配置路由
// 首页
router.get("/index",async (req,res)=>{
    console.log(app.locals.userName);
    let result = await goods.find();
    if(result){
        res.render("index",{goods:result,user:app.locals.userName});//不能放另一个模块
    }
});


// 添加商品
router.post("/addGoods",require("./admin_router/goodsadd"));


// 修改商品
router.get("/updateGoods",async (req,res)=>{
    console.log(req.query.id);
    let result = await goods.find({"_id":req.query.id});
    console.log(result)
    if(result){
        res.render("update",{
            u_goods:result[0],
            user:app.locals.userName
        });
    }
});
// 提交修改操作
router.post("/goodsUpdate",async (req,res)=>{
    let result = await goods.updateOne({"_id":req.query.id},req.body);
    if(result){
        console.log(result);
        res.redirect("/admin/index");
    }
});


// 删除商品
router.get("/deleteGoods",require("./admin_router/goodsdel"));

// 查找商品
router.get("/findGoods",async (req,res)=>{
    let goodsName = path.basename(req.url).split("?")[1].split("=")[1];
    // 查询的内容是否为空
    if(goodsName){
        // 解码
        goodsName = querystring.unescape(goodsName);
        let result = await goods.find({name:goodsName})
        console.log(result);
        if(result){
            res.render("index",{goods:result,user:app.locals.userName});
        }
    }else{
        console.log("查询内容不能为空")
        res.redirect("/admin/index");
    }
});

// 退出
router.get("/signOut",(req,res)=>{
    // 防止下次登录还在线
    app.locals.userId = null;
    app.locals.userName = null;
    res.redirect("/admin");
});

// 暴露
module.exports = router;