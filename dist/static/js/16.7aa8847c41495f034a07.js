webpackJsonp([16],{"84es":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("sZUK"),i=e("7+uW"),l=e("zL8q");i.default.use(l.Row),i.default.use(l.Col),i.default.use(l.Input);var n={created(){var t=this.getLocalAccountInfo(),a=t.account_id,e=t.account_type,s=localStorage.USERTOKEN;this.uploadParams.account_id=a,this.uploadParams.account_type=e,this.uploadParams.user_name=s},data:()=>({uploadFlag:!1,uploadFileDetail:{},isTxFlag:!1,uploadParams:{filename:"",signfile:"",password:""}}),methods:{selectFile(t){var a=t.target.files[0];this.uploadParams.filename=a.name,this.uploadParams.signfile=a;var e=new FormData;e.append("signfile",this.uploadParams.signfile),e.append("user_name",this.uploadParams.user_name),e.append("account_id",this.uploadParams.account_id),e.append("account_type",this.uploadParams.account_type),s.I.bind(this)(e).then(({data:t})=>{if(console.log(t,111),"success"==t.status){this.uploadFlag=!0,this.uploadFileDetail=t.data;var a=this.uploadFileDetail.complete_signnum?this.uploadFileDetail.complete_signnum.split("/"):[],e=parseInt(a[0]),s=parseInt(a[1]);this.isTxFlag=s-e==1}else this.$message({type:"warning",message:t.detail})})},signFn(){var t=new FormData;t.append("signfile",this.uploadParams.signfile),t.append("user_name",this.uploadParams.user_name),t.append("account_id",this.uploadParams.account_id),t.append("account_type",this.uploadParams.account_type),t.append("password",this.uploadParams.password),s.G.bind(this)(t).then(({data:t})=>{if("success"==t.status)if(this.isTxFlag)this.$message({type:"success",message:"提交交易成功"}),setTimeout(()=>{this.$router.go(-1)},1500);else{var a=new Blob([JSON.stringify(t)]),e=document.createElement("a");e.download="data.hex",e.href=window.URL.createObjectURL(a),e.click()}else this.$message({type:"warning",message:t.detail});console.log(t,87797)})}}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"outerWrap signatureWrap"},[e("el-row",[e("el-col",{attrs:{lg:20,md:22}},[e("div",{staticClass:"commonTitle_one"},[t._v("\n\t\t\t\t资产操作\n\t\t\t\t"),e("span",[e("i",{staticClass:"el-icon-arrow-right"}),t._v(" "),e("span",[t._v("签名")])]),t._v(" "),e("div",[t._v("返回")])])])],1),t._v(" "),e("div",{staticClass:"commonTitle_two"},[t._v("签名交易")]),t._v(" "),e("el-row",[e("el-col",{attrs:{lg:20,md:22}},[e("div",{staticClass:"signatureInpWrap"},[e("input",{attrs:{type:"file"},on:{change:t.selectFile}}),t._v(" "),t.uploadFlag?e("div",[t._v(t._s(t.uploadParams.filename))]):e("div",[t._v("+上传签名文件")])]),t._v(" "),t.uploadFlag?e("div",{staticClass:"signatureDetailWrap"},[e("div",{staticClass:"title"},[t._v("交易信息")]),t._v(" "),e("div",{staticClass:"content"},[e("div",[t._v("交易类型："+t._s(t._f("transactionTextByType")(t.uploadFileDetail.tx_type)))]),t._v(" "),e("div",[t._v("资产类型："+t._s(t.uploadFileDetail.asset_name))]),t._v(" "),e("div",[t._v("资产ID："+t._s(t.uploadFileDetail.asset_id))]),t._v(" "),e("div",[t._v("交易金额："+t._s(t.uploadFileDetail.amount))]),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t\t从：\n\t\t\t\t\t\t\t"),t._l(t.uploadFileDetail.from,function(a,s){return e("div",{key:s},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(a.Address||"--")+"（"+t._s(a.account||"--")+")\n\t\t\t\t\t\t\t")])})],2),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t到：\n\t\t\t\t\t\t"),t._l(t.uploadFileDetail.to,function(a,s){return e("div",{key:s},[t._v("\n\t\t\t\t\t\t\t"+t._s(a.Address||"--")+"（"+t._s(a.account||"--")+")\n\t\t\t\t\t\t")])})],2),t._v(" "),e("div",[t._v("需要签名："+t._s(t.uploadFileDetail.need_signnum))]),t._v(" "),e("div",[t._v("已完成签名："+t._s(t.uploadFileDetail.complete_signnum))])]),t._v(" "),e("div",{staticClass:"title"},[t._v("请输入密码")]),t._v(" "),e("el-input",{attrs:{placeholder:"请输入密码",autocomplete:"new-password",type:"password"},model:{value:t.uploadParams.password,callback:function(a){t.$set(t.uploadParams,"password",a)},expression:"uploadParams.password"}}),t._v(" "),e("div",{staticClass:"subBtn",on:{click:t.signFn}},[t._v(t._s(t.isTxFlag?"提交交易":"生成签名文件"))])],1):t._e()])],1)],1)},staticRenderFns:[]};var d=e("VU/8")(n,o,!1,function(t){e("awJy")},null,null);a.default=d.exports},awJy:function(t,a){}});
//# sourceMappingURL=16.7aa8847c41495f034a07.js.map