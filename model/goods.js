let mongoose = require("mongoose");

// 规则
const addGoods = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"商品名不能为空"],
        trim:true
    }, //商品名字
    img:{
        type:String
    }, //商品图片
    price:{
        type:String,
        required:[true,"价格不能为空"]
    },  //商品价格
    postage:String, //商品邮费
    describe:String //商品描述
});


// 建表
const goodsList = new mongoose.model("goods",addGoods);


module.exports = goodsList;