webpackJsonp([4],{"4ExX":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var l=e("sZUK"),a=e("7+uW"),n=e("zL8q");a.default.use(n.Row),a.default.use(n.Col);var o={created(){l.v.bind(this)().then(({data:t})=>{"success"==t.status&&(this.detail=t.data),console.log(t,111)})},data:()=>({detail:{}}),methods:{}},m={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"outerWrap systemStatusIndexWrap"},[e("el-row",[e("el-col",{attrs:{lg:20,md:22}},[e("div",{staticClass:"commonTitle_one"},[t._v("系统状态")]),t._v(" "),e("div",{staticClass:"commonTitle_two"},[t._v("\n\t\t\t\t配置\n\t\t\t")]),t._v(" "),t.detail.NetInfo?e("div",{staticClass:"systemStatusIndexContentWrap"},[e("el-row",{staticClass:"systemStatusIndexContentItem"},[e("el-col",{attrs:{lg:6,md:6,sm:6}},[t._v("版本号")]),t._v(" "),e("el-col",{attrs:{lg:6,md:6,sm:6}},[e("span",[t._v(t._s(t.detail.NetInfo.version_info.version))])])],1),t._v(" "),e("el-row",{staticClass:"systemStatusIndexContentItem"},[e("el-col",{attrs:{lg:6,md:6,sm:6}},[t._v("语言")]),t._v(" "),e("el-col",{attrs:{lg:6,md:6,sm:6}},[e("span",[t._v("中文")])])],1)],1):t._e(),t._v(" "),e("div",{staticClass:"commonTitle_two"},[t._v("\n\t\t\t\t网络状态\n\t\t\t")]),t._v(" "),t.detail.NetInfo?e("div",{staticClass:"systemStatusIndexContentWrap"},[e("el-row",{staticClass:"systemStatusIndexContentItem"},[e("el-col",{attrs:{lg:6,md:6,sm:6}},[t._v("节点监听")]),t._v(" "),e("el-col",{attrs:{lg:6,md:6,sm:6}},[e("span",[t._v(t._s(t.detail.NetInfo.listening?"链接":"断开"))])])],1),t._v(" "),e("el-row",{staticClass:"systemStatusIndexContentItem"},[e("el-col",{attrs:{lg:6,md:6,sm:6}},[t._v("网络同步")]),t._v(" "),e("el-col",{attrs:{lg:6,md:6,sm:6}},[e("span",[t._v("同步中")])])],1),t._v(" "),e("el-row",{staticClass:"systemStatusIndexContentItem"},[e("el-col",{attrs:{lg:6,md:6,sm:6}},[t._v("连接数")]),t._v(" "),e("el-col",{attrs:{lg:6,md:6,sm:6}},[e("span",[t._v(t._s(t.detail.NetInfo.peer_count))])])],1),t._v(" "),e("el-row",{staticClass:"systemStatusIndexContentItem"},[e("el-col",{attrs:{lg:6,md:6,sm:6}},[t._v("当前高度")]),t._v(" "),e("el-col",{attrs:{lg:6,md:6,sm:6}},[e("span",[t._v(t._s(t.detail.NetInfo.current_block))])])],1),t._v(" "),e("el-row",{staticClass:"systemStatusIndexContentItem"},[e("el-col",{attrs:{lg:6,md:6,sm:6}},[t._v("最高高度")]),t._v(" "),e("el-col",{attrs:{lg:6,md:6,sm:6}},[e("span",[t._v(t._s(t.detail.NetInfo.highest_block))])])],1)],1):t._e()])],1)],1)},staticRenderFns:[]};var d=e("VU/8")(o,m,!1,function(t){e("IF2W")},null,null);s.default=d.exports},IF2W:function(t,s){}});
//# sourceMappingURL=4.aac9a8d0498efdc979fe.js.map