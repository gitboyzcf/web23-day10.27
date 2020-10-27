let mongoose = require("mongoose");

// 规则
const addGoods = new mongoose.Schema({
    name:String, //商品名字
    img:String, //商品图片
    price:String,  //商品价格
    postage:String, //商品邮费
    describe:String //商品描述
});


// 建表
const goodsList = new mongoose.model("goods",addGoods);


module.exports = goodsList;