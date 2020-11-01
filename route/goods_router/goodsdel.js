let express = require("express");

let goods = require("../../model/goods");
// 删除商品
module.exports = async (req,res)=>{
    // 通过query获取get提交的数据
    console.log(req.query);
    let result = await goods.findOneAndDelete({"_id":req.query.id});

    if(result){
        res.redirect("/admin/index");
    }
}