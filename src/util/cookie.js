//设置cookie
const setCookie = function(name, value, hour){
    var Hours = hour;
    var exp =new Date();
    exp.setTime(exp.getTime() + Hours*60*60*1000);
    document.cookie = name +"="+ escape (value) +";expires="+ exp.toGMTString();
}
//读取cookie
const getCookie = function(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else return null;
}
//删除cookie
const delCookie = function(name){
    var exp =new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name +"="+cval+";expires="+exp.toGMTString();
}


module.exports = {
    setCookie,
    getCookie,
    delCookie
}