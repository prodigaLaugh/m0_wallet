webpackJsonp([14],{CMxl:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("sZUK"),i=a("7+uW"),l=a("zL8q");i.default.use(l.Row),i.default.use(l.Col),i.default.use(l.Radio),i.default.use(l.Input),i.default.use(l.Option),i.default.use(l.Select),i.default.use(l.Button);var n={created(){var e=this.getLocalAccountInfo(),t=e.account_id,a=e.account_type;this.params.account_id=t,this.params.account_type=a},data:()=>({submitFlag:!0,params:{myfile:"",password:"",evidence_name:"",associate_evidence:"",evidence_data:"",tx_info:""},fileName:"",file:"",dialogVisible:!1}),methods:{save(){var e=this.params,t=new FormData;if(t.append("myfile",this.file),t.append("account_id",e.account_id),t.append("account_type",e.account_id),t.append("password",e.password),t.append("evidence_name",e.evidence_name),t.append("associate_evidence",e.associate_evidence),t.append("tx_info",e.tx_info),t.append("evidence_data",e.evidence_data),!this.submitFlag)return!1;this.submitFlag=!1,s.M.bind(this)(t).then(({data:e})=>{if("success"==e.status)this.$message({message:"上传成功",type:"success"}),setTimeout(()=>{this.$router.go(-1)},1500);else{var t=e.error;this.$message({message:t,type:"warning"})}this.submitFlag=!0,console.log(e,1111)})},fileSelect(e){var t=e.target,a=t.files[0];this.fileName=t.value,this.file=a}},watch:{file:{handler:function(e,t){},deep:!0}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"outerWrap uploadDepositWrap"},[a("el-row",[a("el-col",{attrs:{lg:20,md:22}},[a("div",{staticClass:"commonTitle_one"},[e._v("\n\t\t\t\t链上存证\n\t\t\t\t"),a("span",[a("i",{staticClass:"el-icon-arrow-right"}),e._v(" "),a("span",[e._v("上传存证")])]),e._v(" "),a("div",[e._v("返回")])]),e._v(" "),a("div",{staticClass:"commonTitle_two"},[e._v("上传存证")]),e._v(" "),a("div",{staticClass:"transferInpWrap"},[a("el-row",{staticClass:"transferInpListsWrap"},[a("el-col",{attrs:{lg:24}},[a("div",{staticClass:"transferInpListLeft"},[e._v("存证名称")]),e._v(" "),a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入上传存证的名称"},model:{value:e.params.evidence_name,callback:function(t){e.$set(e.params,"evidence_name",t)},expression:"params.evidence_name"}})],1),e._v(" "),a("el-col",{attrs:{lg:24}},[a("div",{staticClass:"transferInpListLeft"},[e._v("关联存证")]),e._v(" "),a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入关联的存证hash"},model:{value:e.params.associate_evidence,callback:function(t){e.$set(e.params,"associate_evidence",t)},expression:"params.associate_evidence"}})],1),e._v(" "),a("el-col",{attrs:{lg:24}},[a("div",{staticClass:"transferInpListLeft"},[e._v("存证文件")]),e._v(" "),a("div",{staticClass:"uploadFile"},[a("input",{attrs:{type:"file"},on:{change:e.fileSelect}}),e._v(" "),a("div",[e._v("+选择上传文件")])]),e._v(" "),a("div",[e._v(e._s(e.fileName))])]),e._v(" "),a("el-col",{attrs:{lg:24}},[a("div",{staticClass:"transferInpListLeft"},[e._v("存证数据")]),e._v(" "),a("el-input",{attrs:{type:"textarea",rows:5,placeholder:""},model:{value:e.params.evidence_data,callback:function(t){e.$set(e.params,"evidence_data",t)},expression:"params.evidence_data"}})],1),e._v(" "),a("el-col",{attrs:{lg:24}},[a("div",{staticClass:"transferInpListLeft"},[e._v("备注信息")]),e._v(" "),a("el-input",{attrs:{type:"textarea",rows:5,placeholder:""},model:{value:e.params.tx_info,callback:function(t){e.$set(e.params,"tx_info",t)},expression:"params.tx_info"}})],1),e._v(" "),a("el-col",{attrs:{lg:24}},[a("div",{staticClass:"transferInpListLeft"},[e._v("输入密码")]),e._v(" "),a("el-input",{attrs:{type:"password",autocomplete:"new-password",placeholder:""},model:{value:e.params.password,callback:function(t){e.$set(e.params,"password",t)},expression:"params.password"}})],1),e._v(" "),a("el-col",{attrs:{lg:24}},[a("div",{staticClass:"createAccountBtn",on:{click:e.save}},[e._v("提交上链")])])],1)],1)])],1),e._v(" "),a("el-dialog",{attrs:{title:"文件校验",visible:e.dialogVisible,center:!0,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticStyle:{"text-align":"center","line-height":"24px","font-size":"16px","font-weight":"500"}},[a("div",{staticStyle:{color:"red","font-size":"60px"}},[a("span",{staticClass:"el-icon-warning"})]),e._v(" "),a("p",{staticStyle:{"padding-top":"10px"}},[e._v("需至少上传一种存证信息")]),e._v(" "),a("p",[e._v("请填写存证数据或上传存证文件")])]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 认")])],1)])],1)},staticRenderFns:[]};var c=a("VU/8")(n,o,!1,function(e){a("Rsjk")},"data-v-56d50a40",null);t.default=c.exports},Rsjk:function(e,t){}});
//# sourceMappingURL=14.f92056d12706ee4bef25.js.map