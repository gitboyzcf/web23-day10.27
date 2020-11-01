// 商品集合模块
let goods = require("../../model/goods");
module.exports = async (req,res)=>{
    console.log(req.query.id);
    let result = await goods.find({"_id":req.query.id});
    console.log(result)
    if(result){
        res.render("update",{
            u_goods:result[0],
        });
    }
}