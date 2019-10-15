//------------ajax无刷新页面操作---------------
//param(表单id,是否跳转回进入该页面的入口页面)
function miracleMethod(form_id,tips='确认数据无误后点击确认',http_ref = false){
    layer.confirm(tips,{title: '温馨提示', 'shade': false},function () {
        layer.msg('正在操作，请稍后',{time:0});
        var actionUrl = $('#'+form_id).attr('action');
        var formData = $('#'+form_id)[0];
        var sendData = new FormData(formData);
        $.ajax({
            url: actionUrl,
            type: 'POST',
            // 上传formdata封装的数据
            data: sendData,
            dataType: 'JSON',
            // 不缓存
            cache: false,
            // jQuery不要去处理发送的数据
            processData: false,
            // jQuery不要去设置Content-Type请求头
            contentType: false,
            //成功回调
            success:function(d){
                if(d.code==200){
                    if(d.url){
                        layer.msg(d.msg,{'icon':1,time:1000},function(){
                            window.location = d.url;
                        });
                    }else if(http_ref){
                        layer.msg(d.msg,{'icon':1,time:1000},function(){
                            self.location = document.referrer;
                        });
                    }else{
                        layer.msg(d.msg,{'icon':1,time:1000},function(){
                            window.location.reload();
                        });
                    }
                }else{
                    layer.msg(d.msg,{'icon':2,time:1500});
                }
            },
            error:function(e){
                layer.msg('数据错误',{'icon':2,time:1500});
            }
        });
    });
}