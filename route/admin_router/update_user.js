// 用户集合模块
let uLogin = require("../../model/login");
module.exports = async (req,res)=>{
    console.log(req.query);
    let result = await uLogin.findOne({"_id":req.query.id});
    if(result){
        res.render("update_user",{user:result});
    }
};