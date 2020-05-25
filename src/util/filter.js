
let interceptStr = str => { //超过20个字符 截取
    return str ? str.length > 20
                    ? str.slice(0,20) + '...'
                    : str
               : '--';
}
let interceptPubStr = str => { //超过40个字符 截取
    return str ? str.length > 40
                    ? str.slice(0,40) + '...'
                    : str
               : '--';
}



let filterMoney = str => { //格式化数字(钱)
	var str=str.toString();
	var reg=/(?=(?!(\b))(\d{8})+$)/g;
	if(str.length<=8){
		str = '0.'+ str.padStart(8, '0')
	}else{
		str = str.slice(0,str.length-8) +'.'+ str.slice(-8);
	}

	return str;

}

let transactionTextByType = str =>{ //交易 数字类型转换成文本
	var json = {
		1:'转账',
		2:'发行',
		3:'销毁',
		4:'存证'
	}
	return json[str]||'--';
}
let recordTextByType = str =>{ // 交易状态 数字转换成文本
	var json = {
		1:'已确认',
		2:'失败',
		3:'执行中'
	}
	return json[str]||'--'
}





let timestampToTime = (timestamp) => { //格式化时间
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}





export {
	interceptPubStr,
	interceptStr,
	timestampToTime,
	filterMoney,
	recordTextByType,
	transactionTextByType
}
