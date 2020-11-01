// 用户集合模块
let uLogin = require("../../model/login");
module.exports = async (req,res)=>{
    if(req.app.locals.userName == "admin"){
        let result = await uLogin.create(req.body);
        if(result){
            console.log("用户添加成功");
            res.redirect("/admin/index");
        }else{
            console.log("用户添加失败");
        }
    }else{
        res.send("<script>alert('对不起您不是管理员，您可以通过注册的方式添加'); location.href = '/admin/index'</script>")
    }
};