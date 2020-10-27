//创建集合规则--验证字段
let mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,   //定义数据类型
        required: [true, "用户名不能为空"],      //开启验证，true不能为空
        minlength: [6, "用户名不能小于6位"],  //用户名的最小长度
        maxlength: [11, "用户名不能超11位"],  //用户名的最大长度
        trim: true  //过滤空格
    },
    age: {
        type: Number,
        min: [12, "年龄不能小于12岁"],   //数字最小值
        max: [100, "年龄不能大于100岁"]
    },
    sex: {
        type: String,
        //限定一个选项   男   女  保密
        enum: {
            values: ["男", "女", "保密"],
            message: "性别必须正常，正经点哦"
        }

    },
    address: String,
    phone: String,
    email: String,
    createtime: {
        type: Date,
        default: Date.now   //default设置默认值，  默认电脑当前时间
    }
})

//使用集合规则创建集合
//User集合名
const User = mongoose.model("User", userSchema)

module.exports = User
