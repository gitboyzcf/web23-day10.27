// formidable解析表单提交的文件数据
// 引入formidable模块
let formidable = require("formidable");
// 内置模块path
let path = require("path");
// 引入数据库集合
let goods = require("../../model/goods");
module.exports = async (req,res)=>{

    // 创建一个表单解析对象
    let form = new formidable.IncomingForm();
    // 配置上传文件存放位置，防止在public下的uploads
    form.uploadDir = path.join(__dirname,"../","../","public");
    // 保存上传文件的后缀
    form.keepExtensions = true;
    form.parse(req,async (err,fields,files)=>{
        /*
            fields 获取的是提交的文本数据
            file 文件的信息
        */ 
       // 添加数据
        let result = await goods.create({
            name:fields.name,
            cate_id:fields.cate_id,
            img:files.img.path.split("public")[1],
            price:fields.price,
            postage:fields.postage,
            describe:fields.describe
        })
        console.log(fields);
        console.log(files);
        if(result){
            res.redirect("/admin/index");
        }else{
            console.log("商品添加错误");
        }
    })

}
