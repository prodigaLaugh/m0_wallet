webpackJsonp([32],{"56fK":function(t,e,n){"use strict";var a={name:"SIdentify",props:{identifyCode:{type:String,default:"0123456789"},fontSizeMin:{type:Number,default:20},fontSizeMax:{type:Number,default:30},backgroundColorMin:{type:Number,default:180},backgroundColorMax:{type:Number,default:240},colorMin:{type:Number,default:50},colorMax:{type:Number,default:160},lineColorMin:{type:Number,default:40},lineColorMax:{type:Number,default:180},dotColorMin:{type:Number,default:0},dotColorMax:{type:Number,default:255},contentWidth:{type:Number,default:112},contentHeight:{type:Number,default:40}},methods:{randomNum:(t,e)=>Math.floor(Math.random()*(e-t)+t),randomColor(t,e){return"rgb("+this.randomNum(t,e)+","+this.randomNum(t,e)+","+this.randomNum(t,e)+")"},drawPic(){let t=document.getElementById("s-canvas").getContext("2d");t.textBaseline="bottom",t.fillStyle=this.randomColor(this.backgroundColorMin,this.backgroundColorMax),t.fillRect(0,0,this.contentWidth,this.contentHeight);for(let e=0;e<this.identifyCode.length;e++)this.drawText(t,this.identifyCode[e],e);this.drawLine(t),this.drawDot(t)},drawText(t,e,n){t.fillStyle=this.randomColor(this.colorMin,this.colorMax);let a=this.randomNum(this.fontSizeMin,this.fontSizeMax);t.font=a+"px SimHei";let i=(n+1)*(this.contentWidth/(this.identifyCode.length+1)),s=this.randomNum(this.fontSizeMax,this.contentHeight-5);var o=this.randomNum(-10,10);t.translate(i,s),t.rotate(o*Math.PI/180),t.fillText(e,0,0),t.rotate(-o*Math.PI/180),t.translate(-i,-s)},drawLine(t){for(let e=0;e<4;e++)t.strokeStyle=this.randomColor(this.lineColorMin,this.lineColorMax),t.beginPath(),t.moveTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),t.lineTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),t.stroke()},drawDot(t){for(let e=0;e<20;e++)t.fillStyle=this.randomColor(0,255),t.beginPath(),t.arc(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight),1,0,2*Math.PI),t.fill()}},watch:{identifyCode(){this.drawPic()}},mounted(){this.drawPic()}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"s-canvas"},[e("canvas",{attrs:{id:"s-canvas",width:this.contentWidth,height:this.contentHeight}})])},staticRenderFns:[]},s=n("VU/8")(a,i,!1,null,null,null);e.a=s.exports},"BK/k":function(t,e,n){(function(t){t.BASEURL1="http://47.93.83.227:8090",t.BASEURL2="http://192.168.6.225:8080/v1/query",t.TELREG=/^1[0-9]{10}$/,t.TESTCHINESE=/^[\u4e00-\u9fa5]+$/,t.IDCARD=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,t.TESTNUMBER=/^\d+$/,t.TESTFLOAT=/^\d+(\.\d{1,3})?$/}).call(e,n("DuR2"))},JBQq:function(t,e,n){"use strict";var a=n("mtWM"),i=n.n(a);var s=n("zSLJ");Object(s.getCookie)("USERTOKEN");const o=i.a.create({baseURL:"http://47.93.83.227:8090",timeout:6e10,validateStatus:function(t){return t<500}});e.a={install(t,e){t.prototype.$http=o}}},Luci:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("56fK"),i=n("zSLJ"),s=n("sZUK"),o=n("7+uW"),r=n("zL8q");o.default.use(r.Input),o.default.use(r.Checkbox);var c={components:{SIdentify:a.a},data:()=>({identifyCodes:"1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ",identifyCode:"",verifycode:"",autoLogin:!1,loginFlag:!0,loginParams:{user_name:"",password:""}}),mounted(){this.identifyCode="",this.makeCode(this.identifyCodes,4)},methods:{login(){let t=this.loginParams;return this.loginParams.user_name&&this.loginParams.password&&this.verifycode?this.verifycode.toLocaleLowerCase()!==this.identifyCode.toLocaleLowerCase()?(this.$message({message:"验证码不正确",type:"warning"}),!1):!!this.loginFlag&&(this.loginFlag=!1,void s.A.bind(this)(t).then(({data:t})=>{let e=1,n="false";if("success"===t.status)this.autoLogin&&(e=72,n="true"),Object(i.setCookie)("USERTOKEN",this.loginParams.user_name,e),Object(i.setCookie)("autoLogin",n,e),localStorage.USERTOKEN=this.loginParams.user_name,setTimeout(()=>{location.href="/main/privatekeyManagement"},1500),this.$message({message:"登录成功",type:"success"});else{var a=t.error;this.$message({message:a,type:"warning"})}setTimeout(()=>{this.loginFlag=!0},1500)}).catch(({data:t})=>{console.log(t),this.loginFlag=!0})):(this.$message({message:"请完善信息",type:"warning"}),!1)},randomNum:(t,e)=>Math.floor(Math.random()*(e-t)+t),refreshCode(){this.identifyCode="",this.makeCode(this.identifyCodes,4)},makeCode(t,e){for(let t=0;t<e;t++)this.identifyCode+=this.identifyCodes[this.randomNum(0,this.identifyCodes.length)]}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"loginWrap"},[n("div",{staticClass:"loginContainer"},[n("div",{staticClass:"loginTitle"},[t._v("M0资产存证管理平台")]),t._v(" "),n("div",{staticClass:"loginDescription"},[t._v("登录/Login")]),t._v(" "),n("div",{staticClass:"loginInpWrap"},[n("span",[t._v("用户名")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入用户名",autocomplete:"off"},model:{value:t.loginParams.user_name,callback:function(e){t.$set(t.loginParams,"user_name",e)},expression:"loginParams.user_name"}})],1),t._v(" "),n("div",{staticClass:"loginInpWrap"},[n("span",[t._v("密码")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入密码",type:"password",autocomplete:"new-password"},model:{value:t.loginParams.password,callback:function(e){t.$set(t.loginParams,"password",e)},expression:"loginParams.password"}})],1),t._v(" "),n("div",{staticClass:"loginInpWrap"},[n("span"),t._v(" "),n("label",[n("el-checkbox",{model:{value:t.autoLogin,callback:function(e){t.autoLogin=e},expression:"autoLogin"}},[t._v("3天内自动登录")])],1)]),t._v(" "),n("div",{staticClass:"loginInpWrap"},[n("span",[t._v("校验码")]),t._v(" "),n("div",[n("el-input",{attrs:{placeholder:"请输入右侧的验证码",type:"text"},model:{value:t.verifycode,callback:function(e){t.verifycode=e},expression:"verifycode"}}),t._v(" "),n("div",{on:{click:t.refreshCode}},[n("s-identify",{attrs:{identifyCode:t.identifyCode}})],1)],1)]),t._v(" "),n("div",{staticClass:"loginBtnWrap"},[n("div",{on:{click:function(e){return t.$router.push("/regiser")}}},[t._v("注册账号")]),t._v(" "),n("div",{on:{click:t.login}},[t._v("登录")])])])])},staticRenderFns:[]};var l=n("VU/8")(c,u,!1,function(t){n("jeJA")},"data-v-99dc7f42",null);e.default=l.exports},N2rL:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={};n.d(a,"interceptPubStr",function(){return s}),n.d(a,"interceptStr",function(){return i}),n.d(a,"timestampToTime",function(){return u}),n.d(a,"filterMoney",function(){return o}),n.d(a,"recordTextByType",function(){return c}),n.d(a,"transactionTextByType",function(){return r});n("j1ja"),n("tvR6"),n("sfy8");let i=t=>t?t.length>20?t.slice(0,20)+"...":t:"--",s=t=>t?t.length>40?t.slice(0,40)+"...":t:"--",o=t=>{return t=(t=t.toString()).length<=8?"0."+t.padStart(8,"0"):t.slice(0,t.length-8)+"."+t.slice(-8)},r=t=>{return{1:"转账",2:"发行",3:"销毁",4:"存证"}[t]||"--"},c=t=>{return{1:"已确认",2:"失败",3:"执行中"}[t]||"--"},u=t=>{var e=new Date(1e3*t);return e.getFullYear()+"-"+((e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+(e.getDate()+" ")+(e.getHours()+":")+(e.getMinutes()+":")+e.getSeconds()};n("BK/k");var l=n("7+uW"),h={install(t,e){t.prototype.linkTo=function(t,e){this.$router.push({path:t,query:e})},t.prototype.getSearchType=function(t,e,n){this.$http.post("/chain_browser/searchtype",t).then(({data:t})=>{"0"===t.code?e(t):n(t)}).catch(({data:t})=>{n(t)})},t.prototype.getBlockchainLists=function(t,e){this.$http.get("/chain_manager/list").then(({data:e})=>{t(e)}).catch(({data:t})=>{e(t)})},t.prototype.getLinkAdressByType=function(t){return{0:"/blockchainBrowser_adressDetail",1:"/blockchainBrowser_assetsDetail",2:"/blockchainBrowser_blockchainDetail",3:"/blockchainBrowser_transactionDetail",4:"/blockchainBrowser_UTXODetail"}[t]},t.prototype.goUrlByType=function(t,e){let n=this.getLinkAdressByType(t);this.$router.push({path:n,query:e})},t.prototype.getRouteParams=function(t,e){let n=this.$route.query;var a={};return t.map((t,i)=>{a[e[i]]=n[t]}),a},t.prototype.goBack=function(){this.$router.go(-1)},t.prototype.getLocalAccountInfo=function(){return localStorage.accountInfo?JSON.parse(localStorage.accountInfo):{}},t.prototype.judgeIsSingleSign=function(){return 1==this.getLocalAccountInfo().account_type}}},p=n("/ocq"),d=n("zSLJ");n("Luci");l.default.use(p.a);let m=Object(d.getCookie)("USERTOKEN");Object(d.getCookie)("autoLogin");var f="/login";m&&(f="/main");const g=new p.a({mode:"history",linkActiveClass:"Aactive",routes:[{path:"/login",component:t=>new Promise(function(t){t()}).then(function(){var e=[n("Luci")];t.apply(null,e)}.bind(this)).catch(n.oe)},{path:"/regiser",component:t=>n.e(3).then(function(){var e=[n("ZUxq")];t.apply(null,e)}.bind(this)).catch(n.oe)},{path:"/main",component:t=>Promise.all([n.e(0),n.e(1)]).then(function(){var e=[n("gk7G")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{},children:[{path:"privatekeyManagement",component:t=>Promise.all([n.e(0),n.e(21)]).then(function(){var e=[n("La0m")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"walletIndex",component:t=>n.e(24).then(function(){var e=[n("joJx")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"createAccount",component:t=>n.e(17).then(function(){var e=[n("xUSf")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"createWalletM",component:t=>n.e(26).then(function(){var e=[n("vvuS")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"createWalletS",component:t=>n.e(8).then(function(){var e=[n("0Vgd")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"recoveryMnemonic",component:t=>n.e(16).then(function(){var e=[n("sAgp")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"importBackup",component:t=>n.e(13).then(function(){var e=[n("h/jQ")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"backupType",component:t=>n.e(11).then(function(){var e=[n("+pGm")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"recordMnemonic",component:t=>n.e(20).then(function(){var e=[n("b6HZ")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"verifyMnemonic",component:t=>n.e(2).then(function(){var e=[n("LqQU")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"walletDetail",component:t=>n.e(14).then(function(){var e=[n("0W4F")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"assetWalletIndex",component:t=>n.e(27).then(function(){var e=[n("Pz+3")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"receiveTransfer",component:t=>Promise.all([n.e(0),n.e(18)]).then(function(){var e=[n("koO/")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"transactionRecord",component:t=>n.e(22).then(function(){var e=[n("0Nl3")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"assetManagementIndex",component:t=>n.e(19).then(function(){var e=[n("miNH")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"transfer",component:t=>n.e(12).then(function(){var e=[n("ukcV")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"signature",component:t=>n.e(23).then(function(){var e=[n("84es")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"issue",component:t=>n.e(30).then(function(){var e=[n("bfQr")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"destroy",component:t=>n.e(9).then(function(){var e=[n("8FYg")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"createAssetIndex",component:t=>n.e(6).then(function(){var e=[n("dAq1")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"createAsset",component:t=>n.e(29).then(function(){var e=[n("gsjN")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"editAsset",component:t=>n.e(28).then(function(){var e=[n("b3B/")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"assetDetail",component:t=>n.e(5).then(function(){var e=[n("XBpw")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"chainDeposit",component:t=>Promise.all([n.e(0),n.e(25)]).then(function(){var e=[n("QOIA")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"uploadDeposit",component:t=>n.e(15).then(function(){var e=[n("CMxl")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"depositDetail",component:t=>n.e(10).then(function(){var e=[n("z45v")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"addressManagementIndex",component:t=>Promise.all([n.e(0),n.e(7)]).then(function(){var e=[n("ziMY")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"systemStatusIndex",component:t=>n.e(4).then(function(){var e=[n("4ExX")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{requiresAuth:!0}},{path:"",redirect:"assetWalletIndex"}]},{path:"",redirect:f}],scrollBehavior:(t,e,n)=>n||{x:0,y:0}});g.beforeEach((t,e,n)=>{const a=Object(d.getCookie)("USERTOKEN");t.matched.some(t=>t.meta.requiresAuth)?a?n():n({path:"/login",query:{redirect:t.fullPath}}):n()});var y=g,v=n("NYxO");l.default.use(v.a);let b={accountAlias:localStorage.accountInfo?JSON.parse(localStorage.accountInfo).account_alias:"",systemStatus:{}};const _={changeAccountAlias(t,e){t.accountAlias=e},changeSystemStatus(t,e){t.systemStatus=e}},w={changeLogin(t,e){t.commit("login",e)}},C={loginWrapFlag:t=>t.loginWrapFlag,isLogin:t=>t.isLogin,userInfo:t=>t.userInfo,commonTipsFlag:t=>t.commonTipsFlag,commonTipsText:t=>t.commonTipsText,userCitys:t=>t.userCitys};var $=new v.a.Store({state:b,mutations:_,actions:w,getters:C}),k=n("JBQq"),S=n("zL8q"),x={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app-content"},[e("router-view")],1)},staticRenderFns:[]};var A=n("VU/8")(null,x,!1,function(t){n("N2rL")},null,null).exports;l.default.use(h),Object.keys(a).forEach(t=>{l.default.filter(t,a[t])}),l.default.use(k.a),l.default.use(S.Dialog),l.default.prototype.$message=S.Message,l.default.prototype.$msgbox=S.MessageBox,l.default.prototype.$alert=S.MessageBox.alert,l.default.prototype.$confirm=S.MessageBox.confirm,new l.default({el:"#app",template:"<Layout/>",router:y,store:$,components:{Layout:A}})},jeJA:function(t,e){},sZUK:function(t,e,n){"use strict";e.o=async function(t){return await this.$http.post("/v1/asset/get_assetlist_info",t)},e.b=async function(t){return await this.$http.post("/v1/asset/create_asset",Object.assign({},o,t))},e.f=async function(t){let e=`/v1/asset/${t}`;return await this.$http.delete(e)},e.n=async function(t){return await this.$http.post("/v1/asset/get_asset_info",t)},e.h=async function(t){return await this.$http.post("/v1/asset/update_asset",Object.assign({},o,t))},e.M=async function(t){return await this.$http.post("/v1/evidence/upload_evidence",t)},e.t=async function(t){let e=`/v1/evidence/get_evidencelist/${t}`;return await this.$http.get(e)},e.s=async function(t){let e=`/v1/evidence/get_evidence/${t}`;return await this.$http.get(e)},e.i=async function(t){return await this.$http.post("/v1/evidence/downlod_evidence",t,{responseType:"blob"})},e.j=async function(t){return await this.$http.post("/v1/user/generate_invite_code",Object.assign({},o,t))},e.A=async function(t){return await this.$http.post("/v1/user/log_in",Object.assign({},o,t))},e.u=async function(t){return await this.$http.post("/v1/key/list_key",Object.assign({},o,t))},e.d=async function(t){return await this.$http.post("/v1/key/create_key",Object.assign({},o,t))},e.C=async function(t){return await this.$http.post("/v1/key/query_key_belong_user",Object.assign({},o,t))},e.m=async function(t){return await this.$http.post("/v1/address/list_address",Object.assign({},o,t))},e.a=async function(t){return await this.$http.post("/v1/address/create_address",Object.assign({},o,t))},e.l=async function(t){return await this.$http.post("/v1/account/list_account",Object.assign({},o,t))},e.k=async function(t){return await this.$http.post("/v1/account/wallet_detail",Object.assign({},o,t))},e.e=async function(t){return await this.$http.post("/v1/account/create_single_sign_wallet",Object.assign({},o,t))},e.c=async function(t){return await this.$http.post("/v1/account/create_multi_sign_wallet",Object.assign({},o,t))},e.z=async function(t){return await this.$http.post("/v1/account/load_account",Object.assign({},o,t))},e.g=async function(t){return await this.$http.post("/v1/account/delete_wallet",Object.assign({},o,t))},e.w=async function(t){return await this.$http.post("/v1/asset_opt/issue_multsign",Object.assign({},o,t))},e.y=async function(t){return await this.$http.post("/v1/asset_opt/issue_singlesign",Object.assign({},o,t))},e.J=async function(t){return await this.$http.post("/v1//asset_opt/transfer_multisign",Object.assign({},o,t))},e.L=async function(t){return await this.$http.post("/v1/asset_opt/transfer_singlesign",Object.assign({},o,t))},e.B=async function(t){return await this.$http.post("/v1/asset/get_balance_address",Object.assign({},o,t))},e.I=async function(t){return await this.$http.post("/v1/asset_opt/tx_mulsign_info",t)},e.G=async function(t){return await this.$http.post("/v1/asset_opt/tx_mulsign",t)},e.D=async function(t){return await this.$http.post("/v1/asset_opt/retire_multsign",Object.assign({},o,t))},e.F=async function(t){return await this.$http.post("/v1/asset_opt/retire_singlesign",Object.assign({},o,t))},e.K=async function(t){return await this.$http.post("/v1/asset_opt/transfer_record",Object.assign({},o,t))},e.H=async function(t){return await this.$http.post("/v1/asset_opt/sign_record",Object.assign({},o,t))},e.x=async function(t){return await this.$http.post("/v1/asset_opt/issue_record",Object.assign({},o,t))},e.E=async function(t){return await this.$http.post("/v1/asset_opt/retire_record",Object.assign({},o,t))},e.r=async function(t){return await this.$http.post("/v1/asset/get_assetinfo_list",Object.assign({},o,t))},e.p=async function(t){return await this.$http.post("/v1/asset/get_asset_txlist",Object.assign({},o,t))},e.q=async function(t){return await this.$http.post("/v1/asset/get_address_asset_txlist",Object.assign({},o,t))},e.v=async function(t){return await this.$http.post("/v1/blocks/chain_state",Object.assign({},o,t))};var a=n("7+uW"),i=n("JBQq");a.default.use(i.a);const s=localStorage.USERTOKEN?localStorage.USERTOKEN:"",o={user_name:s,token:"",username:s}},sfy8:function(t,e){},tvR6:function(t,e){},zSLJ:function(t,e){const n=function(t){var e,n=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(n))?unescape(e[2]):null};t.exports={setCookie:function(t,e,n){var a=n,i=new Date;i.setTime(i.getTime()+60*a*60*1e3),document.cookie=t+"="+escape(e)+";expires="+i.toGMTString()},getCookie:n,delCookie:function(t){var e=new Date;e.setTime(e.getTime()-1);var a=n(t);null!=a&&(document.cookie=t+"="+a+";expires="+e.toGMTString())}}}},["NHnr"]);
//# sourceMappingURL=app.569bed9aa050cdb78a26.js.map