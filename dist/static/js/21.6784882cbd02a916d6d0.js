webpackJsonp([21],{"5xVW":function(t,s){},La0m:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("TQvf"),i=a.n(e),l=a("7+uW"),r=a("zL8q"),o=a("sZUK");l.default.use(r.Row),l.default.use(r.Col),l.default.use(r.Input),l.default.use(r.Button),l.default.use(r.Dialog);var n={created(){this.getlist()},data:()=>({lists:[],dialogFormVisible:!1,submitFlag:!0,params:{alias:"",password:"",againPassword:""}}),methods:{getlist(){let t={user_name:localStorage.USERTOKEN};o.u.bind(this)(t).then(({data:t})=>{"success"==t.status&&t.data&&this.lists.splice(0,999,...t.data)})},copy(){var t=new i.a(".tag-read");t.on("success",s=>{this.$message({type:"success",message:"复制成功"}),t.destroy()}),t.on("error",s=>{console.log("该浏览器不支持自动复制"),t.destroy()})},create(){let t=Object.assign({},this.params);if(!this.submitFlag)return!1;this.submitFlag=!1,o.d.bind(this)(t).then(({data:t})=>{if("success"==t.status)this.$message({type:"success",message:"创建成功"}),this.getlist(),setTimeout(()=>{this.submitFlag=!0,this.dialogFormVisible=!1,this.params.alias="",this.params.password="",this.params.againPassword=""},1500);else{var s=t.error;this.$message({type:"warning",message:s}),this.submitFlag=!0}console.log(t,111)})}}},c={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"outerWrap privatekeyWrap"},[a("el-row",[a("el-col",{attrs:{lg:20,md:22}},[a("div",{staticClass:"commonTitle_one"},[t._v("秘钥管理")]),t._v(" "),a("div",{staticClass:"privatekeyInnerWrap"},[a("div",{staticClass:"commonTitle_two"},[t._v("\n\t\t\t\t\t我的秘钥\n\t\t\t\t\t"),a("span",{on:{click:function(s){t.dialogFormVisible=!0}}},[t._v("新建秘钥")])]),t._v(" "),a("div",{staticClass:"privatekeyListsWrap"},[t._l(t.lists,function(s,e){return a("div",{key:e,staticClass:"privatekeyListWrap"},[a("el-row",{staticClass:"privatekeyListTitleWrap"},[a("el-col",{staticClass:"privatekeyListTitle",attrs:{lg:24}},[a("div",[t._v(t._s(s.alias)+" ")]),t._v(" "),a("div",[t._v("\n\t\t\t\t\t\t\t\t\t公钥："+t._s(t._f("interceptPubStr")(s.xpub))+"\n\t\t\t\t\t\t\t\t\t"),a("span"),t._v(" "),a("span",{staticClass:"tag-read blue",attrs:{"data-clipboard-text":s.xpub},on:{click:t.copy}},[t._v("拷贝公钥")])])])],1),t._v(" "),a("el-row",{staticClass:"privatekeyListContentWrap"},[a("el-col",{staticClass:"left",attrs:{lg:20,md:20}},[a("div",[t._v("关联单签钱包：")]),t._v(" "),a("div",t._l(s.associate_account,function(s,e){return 1==s.sign_key_num?a("span",{key:e},[t._v(t._s(s.account_alias))]):t._e()}),0)]),t._v(" "),a("el-col",{staticClass:"right",attrs:{lg:4,md:4}},[1==s.is_single_used?a("div",{class:{disable:1==s.is_single_used}},[t._v("创建单签钱包")]):a("div",{on:{click:function(s){return t.$router.push("/main/createWalletS")}}},[t._v("创建单签钱包")])])],1),t._v(" "),a("el-row",{staticClass:"privatekeyListContentWrap"},[a("el-col",{staticClass:"left",attrs:{lg:20,md:20}},[a("div",[t._v("关联多签钱包：")]),t._v(" "),a("div",t._l(s.associate_account,function(s,e){return 1!=s.sign_key_num?a("span",{key:e},[t._v(t._s(s.account_alias))]):t._e()}),0)]),t._v(" "),a("el-col",{staticClass:"right",attrs:{lg:4,md:4}},[a("div",{on:{click:function(s){return t.$router.push("/main/createWalletM")}}},[t._v("创建多签钱包")])])],1)],1)}),t._v(" "),t.lists.length?t._e():a("div",{staticClass:"noresult"},[t._v("暂无数据")])],2),t._v(" "),a("el-dialog",{attrs:{title:"新建秘钥",visible:t.dialogFormVisible,center:!0},on:{"update:visible":function(s){t.dialogFormVisible=s}}},[a("div",{staticClass:"dialogContentWrap"},[a("div",{staticClass:"title"},[t._v("请设置密钥别称")]),t._v(" "),a("div",{staticClass:"tips"},[t._v("密钥别称是用来区分密钥的标签，该信息不会在区块链上保存")]),t._v(" "),a("el-input",{attrs:{placeholder:"输入别称"},model:{value:t.params.alias,callback:function(s){t.$set(t.params,"alias",s)},expression:"params.alias"}}),t._v(" "),a("div",{staticClass:"title"},[t._v("请设置密钥密码")]),t._v(" "),a("div",{staticClass:"tips"},[t._v("⚠️请设置至少10位字母数字混合的密码，密钥是根据你输入的密码生成的管理资产的加密凭证。请妥善保管、备份密码，忘记密码将导致钱包资产的损失。")]),t._v(" "),a("el-input",{attrs:{placeholder:"输入密码",type:"password",autocomplete:"new-password"},model:{value:t.params.password,callback:function(s){t.$set(t.params,"password",s)},expression:"params.password"}}),t._v(" "),a("el-input",{attrs:{placeholder:"请再次输入密码",type:"password",autocomplete:"new-password"},model:{value:t.params.againPassword,callback:function(s){t.$set(t.params,"againPassword",s)},expression:"params.againPassword"}})],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(s){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("确 定")])],1)])],1)])],1)],1)},staticRenderFns:[]};var d=a("VU/8")(n,c,!1,function(t){a("5xVW")},null,null);s.default=d.exports}});
//# sourceMappingURL=21.6784882cbd02a916d6d0.js.map