//使用mongoose模块连接mongodb数据库

//第一步下载:
//cnpm install mongoose --save
//引入模块
let mongoose = require("mongoose");
//连接数据库  student就是数据库名，如果本地没有这个数据会自动创建
let DB = mongoose.connect("mongodb://localhost/shop", { useNewUrlParser: true, useUnifiedTopology: true })

DB.then(() => {
    console.log("数据库连接成功");
}, () => {
    console.log("数据库连接失败");
})


//创建集合规则
const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
    sex: String,
    address: String,
    phone: String,
    email: String
})

//使用集合规则创建集合
//User集合名
const User = mongoose.model("User", userSchema)


User.create({
    username: "王五",
    age: 38,
    sex: "女",
    address: "河南南阳",
    phone: "13333333333",
    email: "123@qq.com"
}).then((res) => {
    console.log(res);
})
