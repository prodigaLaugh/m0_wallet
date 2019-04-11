<template>
	<div class="outerWrap transferWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				<div class="commonTitle_one">
					资产操作
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>发行</span>
					</span>
					<div>返回</div>
				</div>
				
			</el-col>
		</el-row>
		
		<div class="commonTitle_two">发行</div>
		
		<div class="transferInpWrap">
			<el-row>
				<el-col :lg="20" :md="22">
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">发行地址</div>
							<el-select v-model="to_address" placeholder="请选择">
								<el-option
								  v-for="item in address"
								  :key="item.address_id"
								  :label="item.address_id"
								  :value="item.address_id">
								</el-option>
							  </el-select>
						</el-col>
						
						<el-col :lg="24">
							<div class="transferInpListLeft">发行资产</div>
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
							<div class="transferInpListLeft">发行数量</div>
							<el-input v-model="to_amount" placeholder="请输入要发行的资产数量"></el-input>
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
							<!-- <div 
								@click="issue"
								class="transferAccoutItemBtn">提交交易</div> -->
							<div 
								@click="issue"
								class="transferAccoutItemBtn">生成签名文件</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		
		
		
	</div>
</template>

<script>
	import { getAddressLists, getAssetLists, issueMultsign, issueSinglesign } from '@/util/server.js'
	import Vue from 'vue';
	import { Row, Col, Input, Select, Option } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);
	
	
	export default {
		created(){
			var formdata = new FormData();
			var account_id = this.getLocalAccountInfo().account_id;
			
			
			formdata.append('account_id',account_id)
			
			getAssetLists.bind(this)(formdata)
				.then(({data})=>{
					var data = data.data;
					var asset_unissue = data.asset_unissue || [];
					var asset_issue = data.asset_issue || [];
					this.allAssetsLists = [...asset_unissue,...asset_issue]
					console.log(data,111)
				})
				.catch(()=>{
					
				})
			let account_alias = this.getLocalAccountInfo().account_alias;
			var params = {account_alias: account_alias}
			getAddressLists.bind(this)(params)
				.then(({data})=>{
					this.address = data.data;
					console.log(data,111)
				})
		},
		data(){
			return {
				allAssetsLists:[],
				address:[],
				
				to_address:'',
				to_amount:'',
	
				params:{
					password:"",
					amount:'',
					asset_name:"",
					asset_id:"",
					receive_info:[]
				},
				
				
			}
		},
		methods:{
			issue(){
				var list = this.allAssetsLists.filter((item,index)=>{
					return item.asset_id ==this.params.asset_id
				})
				
				this.params.asset_name = list[0].asset_name;
				var amount = this.to_amount-0||0;
				var receive_info = [{
						to_address:this.to_address,
						to_amount:this.to_amount-0||0
					}]
								
				let para = Object.assign({},this.params,this.getLocalAccountInfo());
				para.amount = amount;
				para.receive_info = receive_info;
				
				
				issueMultsign.bind(this)(para)
					.then(({data})=>{
						console.log(data,89888)
						if(data.status=='success'){
							var blob = new Blob([JSON.stringify(data)])
							var a = document.createElement('a');
							a.download = 'data.hex';
							a.href=window.URL.createObjectURL(blob)
							a.click()
						}else{
							this.$message({
								type:'warning',
								message:data.detail 
							})
						}
					})
				issueSinglesign.bind(this)(para)
					.then(({data})=>{
						console.log(data,89888)
					})
			}
		},
	}
</script>

