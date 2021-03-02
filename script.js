var page=1;
$("#btnPre").on("click", function(){
    page--;
    getList();
});
$("#btnNext").on("click", function(){
    page++;
    getList();
});
getList();
$("#txtQuery").on("keydown",function(e){
    page=1;
    if(e.keyCode==13){
        getList();
    }
});
$("btnSearch").on("click",function(){
    page=1;
    getList();
});
$("#selSize").on("change",function(){
    page=1;
    getList();
});

function getList(){
    var query=$("#txtQuery").val();
    var size=$("#selSize").val();
    $.ajax({
        type:"get",
        url:url,
        headers:{"Authorization":"KakaoAK a60bc09c00995f3ab5c8f997d00e3c46"},
        data:{"query":query, "size":size, "page":page},
        dataType:"json",
        success:function(data){
            
            var temp=Handlebars.compile($("#temp").html());
            $("#tbl").html(temp(data));
            
             var lastPage=Math.ceil(data.meta.pageable_count/size);
             $("#spanPage").html(page+"/"+lastPage);
             if(page==1){
            $("#btnPre").attr("disabled",true);
             }else{
            $("#btnPre").attr("disabled",false);
             }
             if(page==lastPage){
            $("#btnNext").attr("disabled",true);
             }else{
            $("#btnNext").attr("disabled",false);
             }
        }
    });
}