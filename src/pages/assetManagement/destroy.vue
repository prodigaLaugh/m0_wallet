<template>
	<div class="outerWrap transferWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				<div class="commonTitle_one">
					资产操作
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>销毁</span>
					</span>
					<div>返回</div>
				</div>
			</el-col>
		</el-row>
			
		<div class="commonTitle_two">销毁</div>
		
		<div class="transferInpWrap">
			<el-row>
				<el-col :lg="20" :md="22">
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">所在地址</div>
							<el-select v-model="params.from_address" placeholder="请选择">
								<el-option
								  v-for="item in address"
								  :key="item.address_id"
								  :label="item.address_id"
								  :value="item.address_id">
								</el-option>
							  </el-select>
						</el-col>
						
						<el-col :lg="24">
							<div class="transferInpListLeft">销毁资产类型</div>
							<el-select v-model="params.asset_id" placeholder="请选择">
								<el-option
									v-for="item in allAssetsLists"
									:key="item.value"
									:label="item.asset_name"
									:value="item.asset_id">
								</el-option>
							</el-select>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">销毁数量</div>
							<el-input v-model="params.amount" placeholder="请输入目标地址"></el-input>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">请输入密码</div>
							<el-input 
								v-model="params.password" 
								placeholder="请输入密码"
								autocomplete="new-password"
								type="password"></el-input>
						</el-col>
						
						<el-col :lg="24">
							<div 
								class="transferAccoutItemBtn"
								@click="retire">{{isSingleSign?'提交交易':'生成签名文件'}}</div>
							<!-- <div class="transferAccoutItemBtn">提交交易</div> -->
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		
		
		
	</div>
</template>

<script>
	import { getAddressLists, getAssetWalletLists, retireMultsign, retireSinglesign } from '@/util/server.js'
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
			
			let para ={account_id:account_id}
			getAssetWalletLists.bind(this)(para)
				.then(({data})=>{
					var data = data.data;
					
					this.allAssetsLists = [...data]
					console.log(data,111)
				})
				.catch(()=>{
					
				})
				
			var params = {account_alias: account_alias}
			getAddressLists.bind(this)(params)
				.then(({data})=>{
					this.address = data.data;
					console.log(data,111)
				})
		},
		data(){
			return {
				isSingleSign:false,//是否是单签
				
				allAssetsLists:[],
				address:[],
				
		
	
				params:{
					password:"",
					amount:'',
					asset_name:"",
					asset_id:"",
					from_address:'',
				},
			}
		},
		methods:{
			retire(){
				var list = this.allAssetsLists.filter((item,index)=>{
					return item.asset_id ==this.params.asset_id
				})
				
				this.params.asset_name = list[0].asset_name;
								
				let para = Object.assign({},this.params);
				para.amount-=0;
				
				
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
								type:'warning',
								message:data.error
							})
						}
					})
			},
			retireMutil(para){
				retireMultsign.bind(this)(para)
					.then(({data})=>{
						if(data.status=='error'){
							this.$message({
								type:'warning',
								message:data.error
							})
						}else{
							let element = document.createElement('a')
							element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data))
							element.setAttribute('download', 'data.hex')
							element.style.display = 'none'
							document.body.appendChild(element)
							element.click()
							document.body.removeChild(element)
						}
						
					})
			}
		},
	}
</script>

<style lang="scss">
	.transferWrap{
		
	}
	
</style>