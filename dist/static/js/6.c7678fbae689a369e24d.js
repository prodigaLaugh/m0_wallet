webpackJsonp([6],{iCzM:function(s,t){},"koO/":function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a("Gu7T"),n=a.n(e),i=a("sZUK"),o=a("TQvf"),c=a.n(o),r=a("7+uW"),l=a("zL8q");r.default.use(l.Row),r.default.use(l.Col);var d={created:function(){this.getLists()},data:function(){return{lists:[]}},methods:{getLists:function(){var s=this,t={account_alias:this.getLocalAccountInfo().account_alias,page:1,page_size:999999};i.m.bind(this)(t).then(function(t){var a=t.data;console.log(a,1119);var e,i=a.data.list_address;i?(e=s.lists).splice.apply(e,[0,99999].concat(n()(i))):s.lists.splice(0,99999);console.log(a,111)})},copy:function(){var s=this,t=new c.a(".tag-read");t.on("success",function(a){console.log("复制成功"),s.$message({type:"success",message:"复制成功"}),t.destroy()}),t.on("error",function(s){console.log("该浏览器不支持自动复制"),t.destroy()})}}},u={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"outerWrap addressManagementIndexWrap"},[a("div",{staticClass:"commonTitle_one"},[a("span",{on:{click:function(t){return s.$router.go(-1)}}},[s._v("资产钱包")]),s._v("/接收转账\n      ")]),s._v(" "),a("div",{staticClass:"commonListsWrap"},s._l(s.lists,function(t,e){return a("div",{key:e,staticClass:"commonListWrap"},[a("div",{staticClass:"infoBtnWrap",staticStyle:{"border-bottom":"0 none"}},[a("div",{staticClass:"des"},[a("span",[s._v("\n              "+s._s(t.address_id)+"\n             ")]),s._v(" "),a("span",{staticClass:"tag-read blue",attrs:{"data-clipboard-text":t.address_id},on:{click:s.copy}})])]),s._v(" "),a("div",{staticClass:"assets"},[a("div",[a("span",[s._v("包含资产")]),s._v(" "),a("div",s._l(t.asset_names,function(t,e){return a("span",{key:e},[s._v(s._s(t))])}),0)]),s._v(" "),a("div")])])}),0)])},staticRenderFns:[]};var v=a("VU/8")(d,u,!1,function(s){a("iCzM")},null,null);t.default=v.exports}});
//# sourceMappingURL=6.c7678fbae689a369e24d.js.map