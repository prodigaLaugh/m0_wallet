webpackJsonp([9],{La0m:function(s,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=t("woOf"),i=t.n(e),l=t("Gu7T"),r=t.n(l),o=t("mvHQ"),n=t.n(o),c=t("TQvf"),u=t.n(c),d=t("7+uW"),p=t("zL8q"),v=t("sZUK");d.default.use(p.Row),d.default.use(p.Col),d.default.use(p.Input),d.default.use(p.Button),d.default.use(p.Dialog);var _={created:function(){this.getlist()},data:function(){return{lists:[],dialogFormVisible:!1,submitFlag:!0,params:{alias:"",password:"",againPassword:""}}},methods:{createWallet:function(s,a){localStorage.privateItem=n()(s),this.$router.push({path:a,query:{from:"privatekey"}})},getlist:function(){var s=this,a={user_name:localStorage.USERTOKEN};v.y.bind(this)(a).then(function(a){var t,e=a.data;(console.log(e,111),"success"==e.status)&&(e.data&&(t=s.lists).splice.apply(t,[0,999].concat(r()(e.data.list_keys))))})},copy:function(){var s=this,a=new u.a(".tag-read");a.on("success",function(t){s.$message({type:"success",message:"复制成功"}),a.destroy()}),a.on("error",function(s){console.log("该浏览器不支持自动复制"),a.destroy()})},create:function(){var s=this,a=i()({},this.params),t=this.params,e=t.alias,l=t.password,r=t.againPassword;if(e)if(/^[a-zA-Z]+$/.test(e))if(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{10,}$/.test(l)&&/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{10,}$/.test(r))if(l===r){if(!this.submitFlag)return!1;this.submitFlag=!1,v.d.bind(this)(a).then(function(a){var t=a.data;if("success"==t.status)s.$message({type:"success",message:"创建成功"}),s.getlist(),setTimeout(function(){s.submitFlag=!0,s.dialogFormVisible=!1,s.params.alias="",s.params.password="",s.params.againPassword=""},1500);else{var e=t.error;s.$message({type:"error",message:e}),s.submitFlag=!0}console.log(t,111)})}else this.$message({type:"error",message:"两次密码不一致"});else this.$message({type:"error",message:"请输入正确格式的密码"});else this.$message({type:"error",message:"请输入正确格式的密钥别称"});else this.$message({type:"error",message:"请输入密钥别称"})}}},m={render:function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"outerWrap privatekeyWrap"},[t("div",{staticClass:"commonTitle_one"},[s._v("秘钥管理")]),s._v(" "),t("div",{staticClass:"privatekeyInnerWrap"},[t("div",{staticClass:"commonTitle_two"},[s._v("\n        我的秘钥\n        "),t("span",{on:{click:function(a){s.dialogFormVisible=!0}}},[s._v("新建秘钥")])]),s._v(" "),t("div",{staticClass:"commonListsWrap"},[s._l(s.lists,function(a,e){return t("div",{key:e,staticClass:"commonListWrap"},[t("div",{staticClass:"tit"},[s._v(s._s(a.alias))]),s._v(" "),t("div",{staticClass:"infoBtnWrap"},[t("div",{staticClass:"des"},[t("span",[s._v("\n                 公钥："+s._s(s._f("interceptPubStr")(a.xpub))+"\n               ")]),s._v(" "),t("span",{staticClass:"tag-read blue",attrs:{"data-clipboard-text":a.xpub},on:{click:s.copy}})]),s._v(" "),t("div",{staticClass:"btn"},[1==a.is_single_used?t("div",{class:{disable:1==a.is_single_used}},[s._v("创建单签钱包")]):t("div",{on:{click:function(t){return s.createWallet(a,"/main/createWalletS")}}},[s._v("创建单签钱包")]),s._v(" "),t("div",{on:{click:function(t){return s.createWallet(a,"/main/createWalletM")}}},[s._v("创建多签钱包")])])]),s._v(" "),t("div",{staticClass:"listsWrap"},[t("div",{staticClass:"listWrap"},[t("span",[s._v("关联单签钱包：")]),s._v(" "),t("div",s._l(a.associate_account,function(a,e){return 1==a.sign_key_num?t("span",{key:e},[s._v(s._s(a.account_alias))]):s._e()}),0)]),s._v(" "),t("div",{staticClass:"listWrap"},[t("span",[s._v("关联多签钱包：")]),s._v(" "),t("div",s._l(a.associate_account,function(a,e){return 1!=a.sign_key_num?t("span",{key:e},[s._v(s._s(a.account_alias))]):s._e()}),0)])])])}),s._v(" "),s.lists.length?s._e():t("div",{staticClass:"noresult"},[s._v("暂无数据")])],2),s._v(" "),t("el-dialog",{attrs:{title:"新建秘钥",visible:s.dialogFormVisible,center:!0},on:{"update:visible":function(a){s.dialogFormVisible=a}}},[t("div",{staticClass:"dialogContentWrap"},[t("div",{staticClass:"title"},[s._v("请设置密钥别称")]),s._v(" "),t("div",{staticClass:"tips"},[s._v("密钥别称是用来区分密钥的标签，该信息不会在区块链上保存（请设置字母格式的名称）")]),s._v(" "),t("el-input",{attrs:{placeholder:"输入别称"},model:{value:s.params.alias,callback:function(a){s.$set(s.params,"alias",a)},expression:"params.alias"}}),s._v(" "),t("div",{staticClass:"title"},[s._v("请设置密钥密码")]),s._v(" "),t("div",{staticClass:"tips"},[s._v("⚠️请设置至少10位字母数字混合的密码，密钥是根据你输入的密码生成的管理资产的加密凭证。请妥善保管、备份密码，忘记密码将导致钱包资产的损失。")]),s._v(" "),t("el-input",{attrs:{placeholder:"输入密码",type:"password",autocomplete:"new-password"},model:{value:s.params.password,callback:function(a){s.$set(s.params,"password",a)},expression:"params.password"}}),s._v(" "),t("el-input",{attrs:{placeholder:"请再次输入密码",type:"password",autocomplete:"new-password"},model:{value:s.params.againPassword,callback:function(a){s.$set(s.params,"againPassword",a)},expression:"params.againPassword"}})],1),s._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){s.dialogFormVisible=!1}}},[s._v("取 消")]),s._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:s.create}},[s._v("确 定")])],1)])],1)])},staticRenderFns:[]};var g=t("VU/8")(_,m,!1,function(s){t("T9r/")},"data-v-7f8c17cc",null);a.default=g.exports},"T9r/":function(s,a){}});
//# sourceMappingURL=9.b40d3d11d7c7967e3122.js.map