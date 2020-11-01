// 引入数据库集合
let goods = require("../../model/goods");
module.exports = (req,res)=>{
    // 添加数据
    goods.create(req.body).then((result)=>{
        res.redirect("/admin/index");
    })
}
