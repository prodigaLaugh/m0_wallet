webpackJsonp([10],{pNE5:function(t,e){},z45v:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("sZUK"),l=a("7+uW"),n=a("zL8q");l.default.use(n.Row),l.default.use(n.Col),l.default.use(n.Dialog);var o={created(){let t=this.$route.query.id;s.s.bind(this)(t).then(({data:t})=>{console.log(t,111);t=t.data;this.detail=t})},data:()=>({downloadUrl:"",detail:{}}),methods:{download(t,e){var a=new FormData;a.append("uuid",t),a.append("file_name",e),s.i.bind(this)(a).then(({data:t})=>{console.log(t,4444);var a=t,s=new FileReader;s.readAsDataURL(a),s.onload=function(t){var a=document.createElement("a");a.download=e,a.href=t.target.result,document.body.appendChild(a),a.click(),document.body.removeChild(a)}})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"outerWrap depositDetailWrap"},[a("el-row",[a("el-col",{attrs:{lg:20,md:22}},[a("div",{staticClass:"commonTitle_one"},[t._v("\n\t\t\t\t链上存证\n\t\t\t\t"),a("span",[a("i",{staticClass:"el-icon-arrow-right"}),t._v(" "),a("span",[t._v("存证详情")])]),t._v(" "),a("div",{on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])]),t._v(" "),a("div",{staticClass:"commonTitle_two"},[t._v("\n\t\t\t\t存证概况\n\t\t\t")]),t._v(" "),a("div",{staticClass:"systemStatusIndexContentWrap"},[a("el-row",{staticClass:"systemStatusIndexContentItem"},[a("el-col",{attrs:{lg:6}},[t._v("存证名称")]),t._v(" "),a("el-col",{attrs:{lg:18}},[a("span",[t._v(t._s(t.detail.evidence_name))])])],1),t._v(" "),a("el-row",{staticClass:"systemStatusIndexContentItem"},[a("el-col",{attrs:{lg:6}},[t._v("上链交易hash")]),t._v(" "),a("el-col",{attrs:{lg:18}},[a("span",[t._v(t._s(t.detail.tx_id))])])],1),t._v(" "),a("el-row",{staticClass:"systemStatusIndexContentItem"},[a("el-col",{attrs:{lg:6}},[t._v("备注信息")]),t._v(" "),a("el-col",{attrs:{lg:18}},[a("span",{staticStyle:{width:"auto"}},[t._v(t._s(t.detail.describe))])])],1)],1),t._v(" "),a("div",{staticClass:"commonTitle_two"},[t._v("存证文件")]),t._v(" "),a("div",{staticClass:"systemStatusIndexContentWrap"},[a("el-row",{staticClass:"systemStatusIndexContentItem"},[a("el-col",{attrs:{lg:8}},[t._v("文件名")]),t._v(" "),a("el-col",{attrs:{lg:6}},[a("span",[t._v("文件大小")])]),t._v(" "),a("el-col",{attrs:{lg:10}},[t._v("操作")])],1),t._v(" "),a("el-row",{staticClass:"systemStatusIndexContentItem"},[a("el-col",{attrs:{lg:8}},[t._v(t._s(t.detail.file_name||"--"))]),t._v(" "),a("el-col",{attrs:{lg:6}},[a("span",[t._v(t._s(t.detail.file_size||"--"))])]),t._v(" "),a("el-col",{attrs:{lg:10}},[a("span",{staticClass:"blue",on:{click:function(e){return t.download(t.detail.uuid,t.detail.file_name)}}},[t._v("下载链上文件")]),t._v(" "),a("span",{staticClass:"blue"},[t._v("校验我的文件")])])],1)],1),t._v(" "),a("div",{staticClass:"commonTitle_two"},[t._v("存证数据")]),t._v(" "),a("div",{staticClass:"depositDataContent"},[t._v("\n\t\t\t\tdescription\n\t\t\t")])])],1)],1)},staticRenderFns:[]};var d=a("VU/8")(o,i,!1,function(t){a("pNE5")},null,null);e.default=d.exports}});
//# sourceMappingURL=10.c4f7eec15d67e13f5360.js.map