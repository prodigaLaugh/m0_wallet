webpackJsonp([9],{"+VBn":function(t,s){},ziMY:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("Gu7T"),i=a.n(e),n=a("sZUK"),o=a("7+uW"),c=a("zL8q"),l=a("TQvf"),r=a.n(l);o.default.use(c.Row),o.default.use(c.Col),o.default.use(c.Button),o.default.use(c.Pagination);var u={created:function(){this.accountInfo=this.getLocalAccountInfo();var t=this.accountInfo.account_alias;this.params.account_alias=t,this.getLists()},data:function(){return{accountInfo:"",lists:[],dialogVisible:!1,value:"",params:{page:1,page_size:10,total:0,account_alias:""},submitFlag:!0}},methods:{pageChange:function(t){this.params.page=t,this.getLists()},getLists:function(){var t=this;n.m.bind(this)(this.params).then(function(s){var a,e=s.data.data,n=e.list_address,o=e.total_item;n?((a=t.lists).splice.apply(a,[0,999].concat(i()(n))),t.params.total=o):t.lists.splice(0,999)})},create:function(){var t=this,s={account_alias:this.accountInfo.account_alias,account_id:this.accountInfo.account_id};this.submitFlag&&(this.submitFlag=!1,n.a.bind(this)(s).then(function(s){var a=s.data;if(console.log(a,666),"success"==a.status)t.$message({type:"success",message:"创建成功"}),t.getLists();else{var e=a.error;t.$message({type:"error",message:e})}t.submitFlag=!0}))},copy:function(){var t=this,s=new r.a(".tag-read");s.on("success",function(a){console.log("复制成功"),t.$message({type:"success",message:"复制成功"}),s.destroy()}),s.on("error",function(t){console.log("该浏览器不支持自动复制"),s.destroy()})}}},d={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"outerWrap addressManagementIndexWrap"},[a("div",{staticClass:"commonTitle_one"},[t._v("地址管理")]),t._v(" "),a("div",{staticClass:"commonTitle_two"},[t._v("\n      账户地址\n      "),t._v(" "),a("span",{on:{click:t.create}},[t._v("创建地址")])]),t._v(" "),a("div",{staticClass:"commonListsWrap"},[t._l(t.lists,function(s,e){return a("div",{key:e,staticClass:"commonListWrap"},[a("div",{staticClass:"infoBtnWrap",staticStyle:{"border-bottom":"0 none"}},[a("div",{staticClass:"des"},[a("span",[t._v("\n              "+t._s(s.address_id)+"\n             ")]),t._v(" "),a("span",{staticClass:"tag-read blue",staticStyle:{"font-size":"18px","margin-left":"10px"},attrs:{"data-clipboard-text":s.address_id},on:{click:t.copy}})])]),t._v(" "),a("div",{staticClass:"assets"},[a("div",[a("span",[t._v("包含资产")]),t._v(" "),a("div",t._l(s.asset_names,function(s,e){return a("span",{key:e},[t._v(t._s(s))])}),0)]),t._v(" "),a("div",[a("span",{on:{click:function(a){return t.$router.push({path:"/main/transfer",query:{address_id:s.address_id}})}}},[t._v("发起转账")]),t._v(" "),a("span",{on:{click:function(a){return t.$router.push({path:"/main/issue",query:{address_id:s.address_id}})}}},[t._v("发行资产")])])])])}),t._v(" "),t.lists.length?a("div",{staticClass:"paginationWrap"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.params.total,"page-size":t.params.page_size},on:{"current-change":t.pageChange}})],1):t._e(),t._v(" "),t.lists.length?t._e():a("div",{staticClass:"noresult"},[t._v("暂无数据")])],2),t._v(" "),a("el-dialog",{attrs:{title:"请输入账户密码",center:!0,visible:t.dialogVisible,width:"40%"},on:{"update:visible":function(s){t.dialogVisible=s}}},[a("div",{staticClass:"dialogContentWrap"},[a("div",{staticClass:"tips"},[t._v("⚠️请输入账户对应的密码，已确认身份")]),t._v(" "),a("el-input",{attrs:{placeholder:"输入密码"},model:{value:t.value,callback:function(s){t.value=s},expression:"value"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(s){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(s){t.dialogVisible=!1}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var v=a("VU/8")(u,d,!1,function(t){a("+VBn")},null,null);s.default=v.exports}});
//# sourceMappingURL=9.e5bcd191fd714733a764.js.map