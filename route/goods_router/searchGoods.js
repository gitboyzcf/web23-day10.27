// 商品集合模块
let goods = require("../../model/goods");
// 用户集合模块
let uLogin = require("../../model/login");
module.exports = async (req,res)=>{

        req.app.locals.searchStr =  req.query.goodsName;
         // 获取给定页数
        let page = Number(req.query.page) || 1;
        // 获取指定几条数据
        let size = Number(req.query.size) || 3;   
    
        let userInfo = await uLogin.find();

        // 查询符合条件的总数据
        let total = await goods.countDocuments({name:new RegExp(req.query.goodsName,"gi")});

         // 计算数据开始显示的位置
        let startPage = (page - 1)*size;

        // 计算总的页数
        let totalPage = Math.ceil(total/size);

        // 按条件查询数据并显示
        let result = await goods.find({name:new RegExp(req.query.goodsName,"gi")}).limit(size).skip(startPage);//gi 全局忽略大小写
        console.log(result);
        if(result){
            // 因渲染页面 所以把值重新传一遍
            res.render("searchIndex",{
                goods:result,
                userInfo,
                page,
                size,
                total,
                totalPage
            });
        }
}