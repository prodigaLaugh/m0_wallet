webpackJsonp([8],{"8eb8":function(t,a){},joJx:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("Gu7T"),i=s.n(e),n=s("mvHQ"),l=s.n(n),c=s("7+uW"),o=s("zL8q"),u=s("sZUK");c.default.use(o.Row),c.default.use(o.Col),c.default.use(o.Button),c.default.use(o.Input),c.default.use(o.Dialog),c.default.use(o.Pagination);var r={created:function(){this.getLists()},data:function(){return{submitFlag:!0,createFlag:!1,walletIndex:0,openDialogFlag:!1,value:"",params:{page:1,page_size:10,total:0},lists:[]}},methods:{del:function(t,a){var s=this,e={account_alias:t.account_alias};if(!this.submitFlag)return!1;this.submitFlag=!1,u.g.bind(this)(e).then(function(t){var e=t.data;"success"==e.status?(s.$message({type:"success",message:"删除成功"}),s.lists.splice(a,1),s.getLists()):s.$message({type:"error",message:e.error||"载入失败"}),setTimeout(function(){s.submitFlag=!0},200),console.log(e)})},zairu:function(t){var a=this,s={account_alias:t.account_alias,pre_account_alias:this.getLocalAccountInfo().account_alias||""};if(!this.submitFlag)return!1;this.submitFlag=!1,u.E.bind(this)(s).then(function(s){var e=s.data;console.log(e,111),"success"==e.status?(a.$message({type:"success",message:"载入成功"}),localStorage.accountInfo=l()(t),a.$store.commit("changeAccountAlias",t.account_alias),a.getLists(),setTimeout(function(){a.$router.push("/main/assetWalletIndex"),a.submitFlag=!0},1e3)):a.$message({type:"error",message:e.error||"载入失败"})})},changeWalletType:function(t){this.walletIndex=t},createWallet:function(){var t=0===this.walletIndex?"/main/createWalletS":"/main/createWalletM";this.$router.push(t)},pageChange:function(t){this.params.page=t,this.getLists()},getLists:function(){var t=this;u.m.bind(this)(this.params).then(function(a){var s=a.data;if("success"==s.status){if(t.$store.commit("changeAccountAlias",""),s.data){var e,n=s.data.list_accounts;n.map(function(a,s){1==a.status&&(localStorage.accountInfo=l()(a),t.$store.commit("changeAccountAlias",a.account_alias))}),(e=t.lists).splice.apply(e,[0,999].concat(i()(n)))}}else t.lists.splice(0,999)})}}},v={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"outerWrap accountIndexWrap"},[s("div",{staticClass:"commonTitle_one"},[t._v("钱包管理")]),t._v(" "),s("div",{staticClass:"selectAccountWrap"},[s("div",{staticClass:"commonTitle_two"},[t._v("\n        我的钱包\n        "),s("div",[s("span",{on:{click:function(a){t.createFlag=!0}}},[t._v("新建钱包")])])]),t._v(" "),s("div",{staticClass:"commonListsWrap"},t._l(t.lists,function(a,e){return s("div",{key:e,staticClass:"commonListWrap"},[s("div",{staticClass:"tit"},[t._v(t._s(a.account_alias)+"\n           "),0==a.status?s("div",{on:{click:function(s){return t.zairu(a)}}},[t._v("载入")]):s("div",{staticClass:"has"},[t._v("载入")])]),t._v(" "),s("div",{staticClass:"tags"},[s("span",[t._v(t._s(a.sign_key_num-0>1?"多签":"单签"))]),t._v(" "),s("div",[s("div",{on:{click:function(s){return t.$router.push({path:"/main/walletDetail",query:{id:a.account_alias}})}}},[t._v("详情")]),t._v(" "),s("div",{on:{click:function(s){return t.del(a,e)}}},[t._v("删除")])])]),t._v(" "),s("div",{staticClass:"relation"},[s("span",[t._v("关联密钥:")]),t._v(" "),s("div",t._l(a.xpubs,function(a,e){return s("div",{key:e},[t._v(t._s(a))])}),0)])])}),0),t._v(" "),t.lists.length?s("div",{staticClass:"paginationWrap"},[s("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.params.total,"page-size":t.params.page_size},on:{"current-change":t.pageChange}})],1):t._e(),t._v(" "),t.lists.length?t._e():s("div",{staticClass:"noresult"},[t._v("暂无数据")])]),t._v(" "),s("el-dialog",{attrs:{title:"请输入账户密码",center:!0,visible:t.openDialogFlag,width:"40%"},on:{"update:visible":function(a){t.openDialogFlag=a}}},[s("div",{staticClass:"dialogContentWrap"},[s("div",{staticClass:"tips"},[t._v("⚠️请输入账户对应的密码，已确认身份")]),t._v(" "),s("el-input",{attrs:{placeholder:"输入密码"},model:{value:t.value,callback:function(a){t.value=a},expression:"value"}})],1),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(a){t.openDialogFlag=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(a){t.openDialogFlag=!1}}},[t._v("确 定")])],1)]),t._v(" "),s("el-dialog",{attrs:{title:"请输选择创建钱包的类型",center:!0,visible:t.createFlag,width:"40%"},on:{"update:visible":function(a){t.createFlag=a}}},[s("div",{staticClass:"selectWalletWrap"},[s("el-row",[s("el-col",{attrs:{md:10}},[s("div",{class:["contentWrap",{active:0===t.walletIndex}],on:{click:function(a){return t.changeWalletType(0)}}},[s("div",{staticClass:"title"},[t._v("单签钱包")]),t._v(" "),s("div",{staticClass:"content"},[t._v("单签钱包内的资产由您本人所有和支配，创建单签钱包需要关联一把密钥，一把密钥只能关联一个单签钱包。")])])]),t._v(" "),s("el-col",{attrs:{md:2}},[t._v(" ")]),t._v(" "),s("el-col",{attrs:{md:10}},[s("div",{class:["contentWrap",{active:1===t.walletIndex}],on:{click:function(a){return t.changeWalletType(1)}}},[s("div",{staticClass:"title"},[t._v("多签钱包")]),t._v(" "),s("div",{staticClass:"content"},[t._v("多签钱包内的资产由多方共同所有和支配，创建多签钱包需要关联一把密钥，一把密钥可关联多个多签钱包。")])])])],1)],1),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(a){t.createFlag=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.createWallet}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var d=s("VU/8")(r,v,!1,function(t){s("8eb8")},null,null);a.default=d.exports}});
//# sourceMappingURL=8.efc50848e84b54431d8d.js.map