$(function(){
    $("ul[role=tablist]").find("a").click(function(){
        // console.log(this)
        // console.log($(this).parent().prevAll(".title").eq(0))
        // 路径导航
        $(".breadcrumb").find("a").eq(0).text($(this).parent().prevAll(".title").eq(0).children().text());
        $(".breadcrumb").find("a").eq(1).text($(this).text());
    })

    // 删除按钮处理
    $(".delGoods").on("click",function(){
        // console.log($(this).attr("data-goodsId"));
        $(".delTemp").val($(this).attr("data-goodsId"));
    })
})