webpackJsonp([30],{bfQr:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("sZUK"),i=e("7+uW"),l=e("zL8q");i.default.use(l.Row),i.default.use(l.Col),i.default.use(l.Input),i.default.use(l.Option),i.default.use(l.Select);var o={created(){this.isSingleSign=this.judgeIsSingleSign();var s=this.$route.query.asset_id;s&&(this.params.asset_id=s);var t=this.getLocalAccountInfo().account_id,e=new FormData;e.append("account_id",t),a.o.bind(this)(e).then(({data:s})=>{console.log(s,9998);var t=(s=s.data).asset_issue||[],e=s.asset_unissue||[];this.allAssetsLists=[...t,...e],console.log(s,111)}).catch(()=>{});var i={account_alias:this.getLocalAccountInfo().account_alias};a.m.bind(this)(i).then(({data:s})=>{this.address=s.data,console.log(s,111)})},data:()=>({isSingleSign:!1,allAssetsLists:[],address:[],to_address:"",to_amount:"",params:{password:"",amount:"",asset_name:"",asset_id:"",receive_info:[]}}),methods:{issue(){var s=this.allAssetsLists.filter((s,t)=>s.asset_id==this.params.asset_id);this.params.asset_name=s[0].asset_name;var t=this.to_amount-0||0,e=[{to_address:this.to_address,to_amount:this.to_amount-0||0}];let a=Object.assign({},this.params,this.getLocalAccountInfo());a.amount=t,a.receive_info=e,this.isSingleSign?this.issueSingle(a):this.issueMutil(a)},issueSingle(s){a.y.bind(this)(s).then(({data:s})=>{console.log(s,89888),"success"==s.status?(this.$message({type:"success",message:"提交成功"}),setTimeout(()=>{this.$router.go(-1)},1500)):this.$message({type:"warning",message:s.error})})},issueMutil(s){a.w.bind(this)(s).then(({data:s})=>{if(console.log(s,89888),"error"==s.status)console.log(1),this.$message({type:"warning",message:s.error});else{console.log(2);let t=document.createElement("a");t.setAttribute("href","data:text/json;charset=utf-8,"+JSON.stringify(s)),t.setAttribute("download","data.hex"),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}})}}},n={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"outerWrap transferWrap"},[e("el-row",[e("el-col",{attrs:{lg:20,md:22}},[e("div",{staticClass:"commonTitle_one"},[s._v("\n\t\t\t\t资产操作\n\t\t\t\t"),e("span",[e("i",{staticClass:"el-icon-arrow-right"}),s._v(" "),e("span",[s._v("发行")])]),s._v(" "),e("div",[s._v("返回")])])])],1),s._v(" "),e("div",{staticClass:"commonTitle_two"},[s._v("发行")]),s._v(" "),e("div",{staticClass:"transferInpWrap"},[e("el-row",[e("el-col",{attrs:{lg:20,md:22}},[e("el-row",{staticClass:"transferInpListsWrap"},[e("el-col",{attrs:{lg:24}},[e("div",{staticClass:"transferInpListLeft"},[s._v("发行地址")]),s._v(" "),e("el-select",{attrs:{placeholder:"请选择"},model:{value:s.to_address,callback:function(t){s.to_address=t},expression:"to_address"}},s._l(s.address,function(s){return e("el-option",{key:s.address_id,attrs:{label:s.address_id,value:s.address_id}})}),1)],1),s._v(" "),e("el-col",{attrs:{lg:24}},[e("div",{staticClass:"transferInpListLeft"},[s._v("发行资产")]),s._v(" "),e("el-select",{attrs:{placeholder:"请选择"},model:{value:s.params.asset_id,callback:function(t){s.$set(s.params,"asset_id",t)},expression:"params.asset_id"}},s._l(s.allAssetsLists,function(s){return e("el-option",{key:s.value,attrs:{label:s.asset_name,value:s.asset_id}})}),1)],1),s._v(" "),e("el-col",{attrs:{lg:24}},[e("div",{staticClass:"transferInpListLeft"},[s._v("发行数量")]),s._v(" "),e("el-input",{attrs:{placeholder:"请输入要发行的资产数量"},model:{value:s.to_amount,callback:function(t){s.to_amount=t},expression:"to_amount"}})],1),s._v(" "),e("el-col",{attrs:{lg:24}},[e("div",{staticClass:"transferInpListLeft"},[s._v("请输入密码")]),s._v(" "),e("el-input",{attrs:{placeholder:"请输入密码",autocomplete:"new-password",type:"password"},model:{value:s.params.password,callback:function(t){s.$set(s.params,"password",t)},expression:"params.password"}})],1),s._v(" "),e("el-col",{attrs:{lg:24}},[e("div",{staticClass:"transferAccoutItemBtn",on:{click:s.issue}},[s._v(s._s(s.isSingleSign?"提交交易":"生成签名文件"))])])],1)],1)],1)],1)],1)},staticRenderFns:[]},r=e("VU/8")(o,n,!1,null,null,null);t.default=r.exports}});
//# sourceMappingURL=30.6776ca74fe41a5b0560c.js.map