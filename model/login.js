let mongoose = require("mongoose");
// require("./db");
const userLogin = new mongoose.Schema({
    username:String, //用户名
    password:String, //密码
});

let uLogin = new mongoose.model("user_login",userLogin);
module.exports = uLogin;