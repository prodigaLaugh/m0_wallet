<template>
	<div class="outerWrap transferWrap">

    <div class="commonTitle_one">

      <span @click="$router.go(-1)">资产操作</span>/销毁

    </div>




		<div class="transferInpWrap">

      <div class="inpItemWrap">
        <div>
          <span>所在地址</span>
          <el-select
            v-model="params.from_address"
            placeholder="请选择"
            @change="adressChangeQueryAmount"
           >
          	<el-option
          	  v-for="item in address"
          	  :key="item.address_id"
          	  :label="item.address_id"
          	  :value="item.address_id">
          	</el-option>
          </el-select>
        </div>
      </div>

      <div class="inpItemWrap">
        <div>
          <span>销毁资产类型</span>
          <el-select
            v-model="params.asset_id"
            placeholder="请选择"
            @change="adressChangeQueryAmount"
           >
          	<el-option
          		v-for="item in allAssetsLists"
          		:key="item.value"
          		:label="item.asset_name"
          		:value="item.asset_id">
          	</el-option>
          </el-select>
        </div>
      </div>

      <div class="inpItemWrap"  v-if="amount || amount ===0">
        <div>
          <span>当前资产余额：</span>
          <span>{{amount}}</span>
        </div>
      </div>


      <div class="inpItemWrap">
        <div>
          <span>销毁数量</span>
          <el-input v-model="params.amount" placeholder="请输入销毁数量"></el-input>
        </div>
      </div>

      <div class="inpItemWrap">
        <div>
          <span>密码</span>
          <el-input
          	v-model="params.password"
          	placeholder="请输入密码"
          	autocomplete="new-password"
          	type="password"></el-input>
        </div>
      </div>


      <div class="inpItemWrap"   >
        <div>
          <span></span>
           <span :class="['submit', !submitFlag ? 'loadingBtn' : '']" @click="retire">{{isSingleSign?'提交交易':'生成签名文件'}}</span>
        </div>

      </div>






		</div>



	</div>
</template>

<script>
	import { queryAssetAmount, getAddressLists, getAssetWalletLists, retireMultsign, retireSinglesign } from '@/util/server.js'
	import Vue from 'vue';
	import { Row, Col, Input, Select, Option } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);


	export default {
		created(){
			this.isSingleSign = this.judgeIsSingleSign();


			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;
			var account_alias = accountInfo.account_alias

			this.params.account_id = account_id;
			this.params.account_type = account_type;

      let para ={account_id:account_id, page: 1, page_size: 9999}
			getAssetWalletLists.bind(this)(para)
				.then(({data})=>{
					const { list_asset: lists, total_item: total } = data.data

					if(data.status=='success'){
					  if(lists){
					    this.allAssetsLists.splice(0,999, ...lists);

					  }else{
					    this.allAssetsLists.splice(0,999);

					  }

					}
				})
				.catch(()=>{

				})

			var params = {account_alias:account_alias, page: 1,
			    page_size: 999999}
			getAddressLists.bind(this)(params)
				.then(({data})=>{
					 const lists = data.data.list_address;
					 if(lists){
					   this.address.splice(0,99999, ...lists) ;
					 }else{
					   this.address.splice(0,99999) ;
					 }
				})
		},
		data(){
			return {
				isSingleSign:false,//是否是单签

				allAssetsLists:[],
				address:[],

        amount:'',



				params:{
					password:"",
					amount:'',
					asset_name:"",
					asset_id:"",
					from_address:'',
				},

        submitFlag:true,
			}
		},
		methods:{
      adressChangeQueryAmount(){
      	var list = this.allAssetsLists.filter((item,index)=>{
      		return item.asset_id ==this.params.asset_id
      	})
      	if(!list.length){
      		return;
      	}
      	var asset_name = list[0].asset_name||'test';
      	this.params.asset_name = asset_name;

      	var para = Object.assign({},this.params)
      	para.address_id = this.params.from_address;
      	queryAssetAmount.bind(this)(para)
      		.then(({data})=>{
      			this.amount = data.data;
      		})
      },
			retire(){

        if(!this.params.from_address){
          this.$message.error('请选择所在地')
        }else if(!this.params.asset_id){
          this.$message.error('请选择销毁资产类型')
          return
        }else if(!this.params.amount){
          this.$message.error('请输入销毁数量')
          return
        }else if(this.params.amount > this.amount){
          this.$message.error('销毁数量不能大于当前资产余额')
          return
        }else if(!this.params.password){
          this.$message.error('请输入密码')
          return
        }


				var list = this.allAssetsLists.filter((item,index)=>{
					return item.asset_id ==this.params.asset_id
				})

				this.params.asset_name = list[0].asset_name;

				let para = Object.assign({},this.params);
				para.amount-=0;

        if(!this.submitFlag){
          return;
        }
        this.submitFlag = false;


				if(this.isSingleSign){
					this.retireSingle(para)
				}else{
					this.retireMutil(para);
				}




			},
			retireSingle(para){
				retireSinglesign.bind(this)(para)
					.then(({data})=>{
						if(data.status=='success'){
							this.$message({
								type:'success',
								message:'提交成功'
							})
							setTimeout(()=>{
								this.$router.go(-1);
							},1500)
						}else{
							this.$message({
								type:'error',
								message:data.error
							})
						}
            this.submitFlag = true;
					}).catch(()=>{
            this.submitFlag = true;
          })
			},
			retireMutil(para){
				retireMultsign.bind(this)(para)
					.then(({data})=>{
						if(data.status=='error'){
							this.$message({
								type:'error',
								message:data.error
							})
						}else{
							 this.createSignFile(data)
						}
            this.submitFlag = true;
					})
          .catch(()=>{
            this.submitFlag = true;
          })
			}
		},
	}
</script>

<style lang="scss">
	.transferWrap{

	}

</style>
