global.BASEURL1 = 'http://'+ location.hostname +':8082' ;//注册接口

global.DEVURL = 'http://123.56.252.12:8082'; //本地开发接口地址
global.PRODUCTURL = 'http://'+ location.hostname +':8082'; //线上接口地址

global.TELREG=/^1[0-9]{10}$/;
global.TESTCHINESE=/^[\u4e00-\u9fa5]+$/;
global.IDCARD=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
global.TESTNUMBER=/^\d+$/;
global.TESTFLOAT=/^\d+(\.\d{1,3})?$/;
