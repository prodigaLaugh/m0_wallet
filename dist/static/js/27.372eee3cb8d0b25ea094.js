webpackJsonp([27],{"3woN":function(s,a){},ukcV:function(s,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=t("woOf"),n=t.n(e),i=t("Gu7T"),r=t.n(i),o=t("sZUK"),d=t("7+uW"),c=t("zL8q");d.default.use(c.Row),d.default.use(c.Col),d.default.use(c.Input),d.default.use(c.Option),d.default.use(c.Select);var l={created:function(){var s=this;this.isSingleSign=this.judgeIsSingleSign();var a=this.getLocalAccountInfo(),t=a.account_id,e=a.account_type,n=a.account_alias;this.params.account_id=t,this.params.account_type=e;var i=this.$route.query,d=i.address_id;if(d){var c=i.asset_id,l=i.asset_name;this.params.from_address=d,this.params.asset_name=l,this.params.asset_id=c}var u={account_id:t,page:1,page_size:9999};o.v.bind(this)(u).then(function(a){var t,e=a.data,n=e.data,i=n.list_asset;n.total_item;"success"==e.status&&(i?(t=s.allAssetsLists).splice.apply(t,[0,999].concat(r()(i))):s.allAssetsLists.splice(0,999))}).catch(function(){});var p={account_alias:n,page:1,page_size:999999};o.n.bind(this)(p).then(function(a){var t,e=a.data.data.list_address;e?(t=s.address).splice.apply(t,[0,99999,{address_id:""}].concat(r()(e))):s.address.splice(0,99999,{address_id:""})})},data:function(){return{isSingleSign:!1,allAssetsLists:[],address:[],to_address:"",amount:"",params:{password:"",amount:"",asset_name:"",asset_id:"",from_address:"",receive_info:[{to_address:"",to_amount:""}]}}},methods:{delPara:function(s){console.log(s,111),s>0&&this.params.receive_info.splice(s,1)},addPara:function(){this.params.receive_info.push({to_address:"",to_amount:""})},adressChangeQueryAmount:function(){var s=this,a=this.allAssetsLists.filter(function(a,t){return a.asset_id==s.params.asset_id});if(a.length){var t=a[0].asset_name||"test";this.params.asset_name=t;var e=n()({},this.params);e.address_id=this.params.from_address,o.G.bind(this)(e).then(function(a){var t=a.data;console.log(t,9898),s.amount=t.data})}},transfer:function(){var s=n()({},this.params);this.to_address,this.to_amount;s.receive_info.map(function(a,t){var e=a.to_amount-0;s.receive_info[t].to_amount=e}),s.amount=s.receive_info.reduce(function(s,a){return s-0+(a.to_amount-0)},0),this.isSingleSign?this.signleSignFn(s):this.mutiSignFn(s)},signleSignFn:function(s){var a=this;o.Q.bind(this)(s).then(function(s){var t=s.data;console.log(t,111),"success"==t.status?(a.$message({type:"success",message:"提交成功"}),setTimeout(function(){a.$router.go(-1)},1500)):a.$message({type:"error",message:t.error})})},mutiSignFn:function(s){var a=this;o.O.bind(this)(s).then(function(s){var t=s.data;console.log(t,222),"error"==t.status?a.$message({type:"error",message:t.error}):a.createSignFile(t)})}}},u={render:function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"outerWrap transferWrap"},[t("div",{staticClass:"commonTitle_one"},[t("span",{on:{click:function(a){return s.$router.go(-1)}}},[s._v("资产操作")]),s._v("/转账\n      ")]),s._v(" "),t("div",{staticClass:"transferInpWrap"},[t("div",{staticClass:"inpItemWrap"},[t("div",[t("span",[s._v("转出地址")]),s._v(" "),t("el-select",{attrs:{placeholder:"请选择"},on:{change:s.adressChangeQueryAmount},model:{value:s.params.from_address,callback:function(a){s.$set(s.params,"from_address",a)},expression:"params.from_address"}},s._l(s.address,function(s){return t("el-option",{key:s.address_id,attrs:{label:s.address_id?s.address_id:"全部",value:s.address_id}})}),1)],1)]),s._v(" "),t("div",{staticClass:"inpItemWrap"},[t("div",[t("span",[s._v("转出资产")]),s._v(" "),t("el-select",{attrs:{placeholder:"请选择"},on:{change:s.adressChangeQueryAmount},model:{value:s.params.asset_id,callback:function(a){s.$set(s.params,"asset_id",a)},expression:"params.asset_id"}},s._l(s.allAssetsLists,function(s){return t("el-option",{key:s.value,attrs:{label:s.asset_name,value:s.asset_id}})}),1)],1)]),s._v(" "),s.amount||0===s.amount?t("div",{staticClass:"inpItemWrap"},[t("div",[t("span",[s._v("当前资产余额")]),s._v(" "),t("span",[s._v(s._s(s.amount))])])]):s._e(),s._v(" "),t("div",{staticClass:"inpTitl"},[s._v("转账详情")]),s._v(" "),t("div",{staticClass:"transferInfoWrap"},[s._l(s.params.receive_info,function(a,e){return t("div",{key:e,staticClass:"inpItemWrap"},[t("div",[t("span",[s._v("目标地址")]),s._v(" "),t("el-input",{attrs:{placeholder:"请输入目标地址"},model:{value:a.to_address,callback:function(t){s.$set(a,"to_address",t)},expression:"item.to_address"}})],1),s._v(" "),t("div",[t("span",[s._v("转出数量")]),s._v(" "),t("el-input",{attrs:{placeholder:"请输入转出数量"},model:{value:a.to_amount,callback:function(t){s.$set(a,"to_amount",t)},expression:"item.to_amount"}})],1),s._v(" "),t("span",{on:{click:function(a){return s.delPara(e)}}},[s._v("删除")])])}),s._v(" "),t("div",{staticClass:"inpItemWrap btnWrap"},[t("div",[t("span"),s._v(" "),t("span",{staticClass:"btn",on:{click:s.addPara}},[s._v("+ 添加转账地址")])])])],2),s._v(" "),t("div",{staticClass:"inpItemWrap"},[t("div",[t("span",[s._v("密码")]),s._v(" "),t("el-input",{attrs:{placeholder:"请输入密码",autocomplete:"new-password",type:"password"},model:{value:s.params.password,callback:function(a){s.$set(s.params,"password",a)},expression:"params.password"}})],1)]),s._v(" "),t("div",{staticClass:"inpItemWrap"},[t("div",[t("span"),s._v(" "),t("span",{staticClass:"submit",on:{click:s.transfer}},[s._v(s._s(s.isSingleSign?"提交交易":"生成签名文件"))])])])])])},staticRenderFns:[]};var p=t("VU/8")(l,u,!1,function(s){t("3woN")},null,null);a.default=p.exports}});
//# sourceMappingURL=27.372eee3cb8d0b25ea094.js.map