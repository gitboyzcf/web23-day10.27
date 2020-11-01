// 商品集合模块
let goods = require("../../model/goods");
// 用户集合模块
let uLogin = require("../../model/login");

module.exports = async (req,res)=>{
    // // 查询商品
    // let goodsResult = await goods.find();
    // // 查询用户
    let userInfo = await uLogin.find();

    // 获取传入的参数
    // 配置分页
    // 获取给定页数
    let page = Number(req.query.page) || 1;
    // 获取指定几条数据
    let size = Number(req.query.size) || 3;

    // 获取goods集合中数据的总数
    let total = await goods.countDocuments();

    // console.log(total);
    // 计算数据开始显示的位置
    let startPage = (page - 1)*size;

    // 计算总的页数
    let totalPage = Math.ceil(total/size);

     // 查询商品
    let goodsResult = await goods.find().limit(size).skip(startPage);
    // let userResult = await uLogin.find().limit
    res.render("index",{
        goods:goodsResult, //查询到的所有商品
        userInfo,  // 查询到的所有用户
        // 分页的值
        page,
        size,
        total,
        totalPage
    });
}