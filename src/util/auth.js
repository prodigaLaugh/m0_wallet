export function getCommonToken(){
    var USERTOKEN = window.localStorage.USERTOKEN;
    return USERTOKEN ? USERTOKEN : '';
} 

export function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); 
	return null; 
} 