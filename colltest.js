// 安装
// cnpm install mongoose --save
// 引入
let mongoose = require("mongoose");
// 连接MongoDB数据库
let DB =  mongoose.connect("mongodb://localhost/shop",{useNewUrlParser:true,useUnifiedTopology:true});
DB.then(()=>{
    console.log("数据库连接成功！");
},()=>{
    console.log("数据库连接失败！");
});

// 创建集合规则
const userRule = new mongoose.Schema({
    username:String,
    password:String,
    age:Number,
    sex:String
});

// 使用规则创建表
const user = new mongoose.model("user",userRule);
console.log(user);
// 添加数据
user.create({
    username:"zhangsan",
    password:"1234",
    age:20,
    sex:"男"
}).then((res)=>{
    console.log(res);
});
