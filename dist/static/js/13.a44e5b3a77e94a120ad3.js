webpackJsonp([13],{"0W4F":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("sZUK"),s=a("7+uW"),n=a("zL8q");s.default.use(n.Row),s.default.use(n.Col);var i={created(){this.getDetail()},data:()=>({detail:{}}),methods:{getDetail(){let t={account_alias:this.$route.query.id};l.k.bind(this)(t).then(({data:t})=>{this.detail=t.data})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.detail&&t.detail.account_alias?a("div",{staticClass:"outerWrap walletDetailWrap"},[a("el-row",[a("el-col",{attrs:{lg:20,md:22}},[a("div",{staticClass:"commonTitle_one"},[t._v("\n\t\t\t\t钱包管理\n\t\t\t\t"),a("span",[a("i",{staticClass:"el-icon-arrow-right"}),t._v(" "),a("span",[t._v("钱包详情")])]),t._v(" "),a("div",{on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])]),t._v(" "),a("div",{staticClass:"commonTitle_two"},[t._v("\n\t\t\t\t钱包概况\n\t\t\t")]),t._v(" "),a("div",{staticClass:"walletDetaiContentWrap"},[a("el-row",{staticClass:"walletDetaiContentItem"},[a("el-col",{attrs:{lg:4,md:4,sm:4}},[t._v("钱包名称")]),t._v(" "),a("el-col",{attrs:{lg:20,md:20,sm:20}},[a("span",[t._v(t._s(t.detail.account_alias))])])],1),t._v(" "),a("el-row",{staticClass:"walletDetaiContentItem"},[a("el-col",{attrs:{lg:4,md:4,sm:4}},[t._v("钱包类型")]),t._v(" "),a("el-col",{attrs:{lg:20,md:20,sm:20}},[a("span",[t._v(t._s(t.detail.sign_key_num-0>1?"多签":"单签"))])])],1)],1),t._v(" "),a("div",{staticClass:"commonTitle_two"},[t._v("\n\t\t\t\t包含资产\n\t\t\t")]),t._v(" "),t.detail.asset2amount_list&&t.detail.asset2amount_list.length?a("div",{staticClass:"walletDetaiContentWrap"},[a("el-row",{staticClass:"walletDetaiContentItem"},[a("el-col",{attrs:{lg:4,md:4,sm:4}},[t._v("资产名称")]),t._v(" "),a("el-col",{attrs:{lg:20,md:20,sm:20}},[a("span",[t._v("余额")])])],1),t._v(" "),t._l(t.detail.asset2amount_list,function(e,l){return a("el-row",{key:l,staticClass:"walletDetaiContentItem"},[a("el-col",{attrs:{lg:4,md:4,sm:4}},[t._v(t._s(e.asset_name))]),t._v(" "),a("el-col",{attrs:{lg:20,md:20,sm:20}},[a("span",[t._v(t._s(e.amount))])])],1)})],2):a("div",{staticClass:"noresult"},[t._v("\n\t\t\t\t暂无数据 \n\t\t\t")]),t._v(" "),a("div",{staticClass:"commonTitle_two"},[t._v("\n\t\t\t\t关联密钥\n\t\t\t")]),t._v(" "),t.detail.xpub2user_name_list&&t.detail.xpub2user_name_list.length?a("div",{staticClass:"walletDetaiContentWrap"},[a("el-row",{staticClass:"walletDetaiContentItem"},[a("el-col",{attrs:{lg:16,md:16,sm:16}},[a("span",[t._v("公钥")])]),t._v(" "),a("el-col",{attrs:{lg:4,md:4,sm:4}},[t._v("相关用户")])],1),t._v(" "),t._l(t.detail.xpub2user_name_list,function(e,l){return a("el-row",{key:l,staticClass:"walletDetaiContentItem"},[a("el-col",{attrs:{lg:16,md:16,sm:16}},[a("span",[t._v(t._s(t._f("interceptPubStr")(e.xpub)))])]),t._v(" "),a("el-col",{attrs:{lg:4,md:4,sm:4}},[t._v(t._s(e.user_name))])],1)})],2):a("div",{staticClass:"noresult"},[t._v("\n\t\t\t\t暂无数据 \n\t\t\t")])])],1)],1):t._e()},staticRenderFns:[]};var _=a("VU/8")(i,o,!1,function(t){a("qEXW")},null,null);e.default=_.exports},qEXW:function(t,e){}});
//# sourceMappingURL=13.a44e5b3a77e94a120ad3.js.map