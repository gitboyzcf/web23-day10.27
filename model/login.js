let mongoose = require("mongoose");
// require("./db");
const userLogin = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"用户名不能为空"], //验证非空
        minlength:4,//最小长度
        maxlength:18,//最大长度
        trim:true//去除空格
    }, //用户名
    password:{
        type:String,
        required:[true,"密码不能为空"],
        minlength:4,
        maxlength:100,
        trim:true
    } //密码
});

let uLogin = new mongoose.model("user_login",userLogin);
module.exports = uLogin;