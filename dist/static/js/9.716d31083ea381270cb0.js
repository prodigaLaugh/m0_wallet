webpackJsonp([9],{"84es":function(a,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=t("sZUK"),i=t("7+uW"),n=t("zL8q");i.default.use(n.Row),i.default.use(n.Col),i.default.use(n.Input);var l={created:function(){var a=this.getLocalAccountInfo(),s=a.account_id,t=a.account_type,e=localStorage.USERTOKEN;this.uploadParams.account_id=s,this.uploadParams.account_type=t,this.uploadParams.user_name=e},data:function(){return{uploadFlag:!1,uploadFileDetail:{},isTxFlag:!1,uploadParams:{filename:"",signfile:"",password:""}}},methods:{bindClick:function(){this.$refs.file.click()},selectFile:function(a){var s=this,t=a.target.files[0];this.uploadParams.filename=t.name,this.uploadParams.signfile=t;var i=new FormData;i.append("signfile",this.uploadParams.signfile),i.append("user_name",this.uploadParams.user_name),i.append("account_id",this.uploadParams.account_id),i.append("account_type",this.uploadParams.account_type),e.L.bind(this)(i).then(function(a){var t=a.data;if("success"==t.status){s.uploadFileDetail=t.data;var e=s.uploadFileDetail.complete_signnum?s.uploadFileDetail.complete_signnum.split("/"):[],i=parseInt(e[0]),n=parseInt(e[1]);s.isTxFlag=n-i==1,console.log(s.isTxFlag,n,i,1111),s.uploadFlag=!0}else s.$message({type:"error",message:t.error})})},signFn:function(){var a=this,s=new FormData;s.append("signfile",this.uploadParams.signfile),s.append("user_name",this.uploadParams.user_name),s.append("account_id",this.uploadParams.account_id),s.append("account_type",this.uploadParams.account_type),s.append("password",this.uploadParams.password),e.J.bind(this)(s).then(function(s){var t=s.data;"error"===t.status?a.$message({type:"error",message:t.error}):a.isTxFlag?(a.$message({type:"success",message:"提交交易成功"}),setTimeout(function(){a.$router.go(-1)},1500)):a.createSignFile(t),console.log(t,87797)})}}},o={render:function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("div",{staticClass:"outerWrap signatureWrap"},[t("div",{staticClass:"commonTitle_one"},[t("span",{on:{click:function(s){return a.$router.go(-1)}}},[a._v("资产操作")]),a._v("/签名\n    ")]),a._v(" "),t("div",{staticClass:"transferInpWrap"},[t("div",{staticClass:"inpItemWrap"},[t("div",[t("span",[a._v("签名文件")]),a._v(" "),a.uploadFlag?t("span",{staticClass:"uploadFileBtn",on:{click:a.bindClick}},[a._v(a._s(a.uploadParams.filename))]):t("span",{staticClass:"uploadFileBtn",on:{click:a.bindClick}},[a._v("+上传签名文件")]),a._v(" "),t("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:a.selectFile}})])]),a._v(" "),a.uploadFlag?t("div",{staticClass:"inpTitl"},[a._v("交易信息")]):a._e(),a._v(" "),a.uploadFlag?t("div",{staticClass:"singsWrap"},[t("div",{staticClass:"signListWrap"},[t("span",[a._v("交易类型:")]),a._v(" "),t("div",[a._v(a._s(a._f("transactionTextByType")(a.uploadFileDetail.tx_type)))])]),a._v(" "),t("div",{staticClass:"signListWrap"},[t("span",[a._v("资产类型:")]),a._v(" "),t("div",[a._v(a._s(a.uploadFileDetail.asset_name))])]),a._v(" "),t("div",{staticClass:"signListWrap"},[t("span",[a._v("资产ID:")]),a._v(" "),t("div",[a._v(a._s(a.uploadFileDetail.asset_id))])]),a._v(" "),t("div",{staticClass:"signListWrap"},[t("span",[a._v("从：")]),a._v(" "),t("div",a._l(a.uploadFileDetail.from,function(s,e){return t("div",{key:e},[a._v("\n            \t"+a._s(s.Address||"--")+"（"+a._s(s.account||"--")+")\n            ")])}),0)]),a._v(" "),t("div",{staticClass:"signListWrap"},[t("span",[a._v("到：")]),a._v(" "),t("div",a._l(a.uploadFileDetail.to,function(s,e){return t("div",{key:e},[a._v("\n            \t"+a._s(s.Address||"--")+"（"+a._s(s.account||"--")+")\n            ")])}),0)]),a._v(" "),t("div",{staticClass:"signListWrap"},[t("span",[a._v("需要签名:")]),a._v(" "),t("div",[a._v(a._s(a.uploadFileDetail.need_signnum))])]),a._v(" "),t("div",{staticClass:"signListWrap"},[t("span",[a._v("已完成签名:")]),a._v(" "),t("div",[a._v(a._s(a.uploadFileDetail.complete_signnum))])])]):a._e(),a._v(" "),a.uploadFlag?t("div",{staticClass:"inpItemWrap"},[t("div",[t("span",[a._v("密码")]),a._v(" "),t("el-input",{attrs:{placeholder:"请输入密码",autocomplete:"new-password",type:"password"},model:{value:a.uploadParams.password,callback:function(s){a.$set(a.uploadParams,"password",s)},expression:"uploadParams.password"}})],1)]):a._e(),a._v(" "),a.uploadFlag?t("div",{staticClass:"inpItemWrap"},[t("div",[t("span"),a._v(" "),t("span",{staticClass:"submit",on:{click:a.signFn}},[a._v(a._s(a.isTxFlag?"提交交易":"生成签名文件"))])])]):a._e()])])},staticRenderFns:[]};var p=t("VU/8")(l,o,!1,function(a){t("bYPc")},null,null);s.default=p.exports},bYPc:function(a,s){}});
//# sourceMappingURL=9.716d31083ea381270cb0.js.map