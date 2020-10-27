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


//查询所有数据
// User.find().then((result) => {
//     console.log(result);
// })

// 查询年龄大于等于28     $gt 大于   $lt小于   $gte大于等于   $lte小于等于

/*
User.find({ age: { $gt: 28 } }).then((result) => {
    console.log(result);  //得到一个数组
})
*/

//查询一条数据
/*
User.findOne({ age: { $gt: 28 } }).then((result) => {
    console.log(result);  //得到一个对象
})
*/

// -值降序排列    +值升序排列
// User.find({}).sort('-age').then((result) => {
//     console.log(result);  //得到一个数组
// })


User.find().skip(1).limit(1).then((result) => {
    console.log(result);  //得到一个数组
})



