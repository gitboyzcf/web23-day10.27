// 商品集合模块
let goods = require("../../model/goods");
// 用户集合模块
let uLogin = require("../../model/login");

module.exports = (req,res)=>{
    res.send("<script>alert('对不起该功能暂时还未开启，望谅解!');location.href='/admin/index';</script>");

    // let page = Number(req.query.page) || 1;
    // let size = Number(req.query.size) || 3;

    // let total = await uLogin.countDocuments();
    // // 计算数据开始显示的位置
    // let startPage = (page - 1)*size;

    // // 计算总的页数
    // let totalPage = Math.ceil(total/size);
    // // 查询用户
    // let userResulu = await uLogin.find().limit(size).skip(startPage);

    // let goods = await goods.find();
    // res.render("user_search",{
    //     userSearch:userResulu, //查询到的所有商品
    //     goods,  // 查询到的所有商品
    //     // 分页的值
    //     page,
    //     size,
    //     total,
    //     totalPage
    // })
}