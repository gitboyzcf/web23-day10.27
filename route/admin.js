let express = require("express");

let router = express.Router();

// 商品集合模块
let goods = require("../model/goods");
// 用户集合模块
let uLogin = require("../model/login");


// 该接口共ajax使用---
router.get("/getUser",async (req,res)=>{
    let result = await uLogin.find({"username":req.query.username});
    if(result){
        res.status(200).send(result);
    }
})

// 配置路由
router.get("/",function(req,res){
    res.render("login");
})


router.post("/login",async (req,res)=>{
    let result = await uLogin.find(req.body);
    console.log(result);
    if(result == 0){
        res.send('<script>alert("该用户不存在,请先注册"); location.href = "/admin"</script>')
    }else{
        console.log("登录成功");
        // 存储该用户
        req.app.locals.userId=result[0]._id; // 定义可以应用整个生命周期中使用的变量
        req.app.locals.userName = result[0].username;
        console.log(req.app.locals.userName)
        
        res.redirect("/admin/index?page=1&size=3");
    }

})

// 注册
router.post("/user_register",async (req,res)=>{
    let userObj = req.body;
    console.log(userObj);
    let result = await uLogin.create(userObj);
    res.redirect("/admin");
});

// 拦截---------------
router.use(function(req,res,next){
    let userId = req.app.locals.userId;
    if(!userId){
        res.render("login");
    }else{
        next();
    }
});

// 配置路由
// 首页
router.get("/index",require("./goods_router/goods_list.js"));


// 添加商品
router.post("/addGoods",require("./goods_router/goodsadd"));


// 修改商品
router.get("/updateGoods",require("./goods_router/update_goods"));
// 提交修改操作
router.post("/goodsUpdate",async (req,res)=>{
    let result = await goods.updateOne({"_id":req.query.id},req.body);
    if(result){
        console.log(result);
        res.redirect("/admin/index");
    }
});


// 删除商品
router.get("/deleteGoods",require("./goods_router/goodsdel"));

// 查找商品
router.get("/searchIndex",require("./goods_router/searchGoods"));

// 退出
router.get("/signOut",(req,res)=>{
    // 防止下次登录还在线
    req.app.locals.userId = null;
    req.app.locals.userName = null;
    res.redirect("/admin");
});


// 对用户的操作=============
// 添加用户
router.post("/addUser",require("./admin_router/add_user"));

// 删除用户
router.get("/deleteUser",require("./admin_router/del_user"));

// 修改用户
router.get("/updateUser",require("./admin_router/update_user"));
// 提交修改
router.post("/userUpdate",async (req,res)=>{
    console.log(req.body);
    console.log(req.app.locals.userName);
    // 当修改时先判断是否修改自己的账户 是就修改，否就不修改，只能修改自己的信息
    let uname = await uLogin.findOne({"_id":req.query.id});
    if(req.app.locals.userName == uname.username){
        let result = await uLogin.updateOne({"_id":req.query.id},{
            username:req.body.username,
            password:req.body.password
        });
        req.app.locals.userName = req.body.username;
        res.redirect("/admin/index");
    }else{
        res.send("<script>alert('只能修改已登录的用户');location.href='/admin/index'</script>");
    }
})
// 搜索用户
router.get("/finduser",require("./admin_router/searchUser"));


// 暴露
module.exports = router;