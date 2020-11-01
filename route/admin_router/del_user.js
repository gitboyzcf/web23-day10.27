let uLogin = require("../../model/login");
module.exports = async (req,res)=>{
    if(req.app.locals.userName == "admin"){
        console.log(111);
        // 根据用户id删除
        let result = await uLogin.findOneAndDelete({"_id":req.query.userId});
        if(result){
            res.redirect("/admin/index");
        }
    }else{
        console.log(222);
        res.send("<script>alert('对不起，您不是管理员请勿操作'); location.href='/admin/index'</script>");
    }
    
};