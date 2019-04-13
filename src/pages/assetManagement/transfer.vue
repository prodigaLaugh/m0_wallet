<template>
	<div class="outerWrap transferWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				<div class="commonTitle_one">
					资产操作
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>转账</span>
					</span>
					<div>返回</div>
				</div>
				
			</el-col>
		</el-row>
		
			
		<div class="commonTitle_two">转账</div>
		
		<div class="transferInpWrap">
			<el-row>
				<el-col :lg="20" :md="22">
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">转出地址</div>
							<el-select 
								v-model="params.from_address"
								 @change="adressChangeQueryAmount"
								placeholder="请选择">
								<el-option
								  v-for="item in address"
								  :key="item.address_id"
								  :label="item.address_id"
								  :value="item.address_id">
								</el-option>
							  </el-select>
						</el-col>
						
						<el-col :lg="24">
							<div class="transferInpListLeft">转出资产</div>
							<el-select 
								v-model="params.asset_id" 
								@change="adressChangeQueryAmount"
								placeholder="请选择">
								<el-option
									v-for="item in allAssetsLists"
									:key="item.value"
									:label="item.asset_name"
									:value="item.asset_id">
								</el-option>
							</el-select>
						</el-col>
						
						<el-col 
							:md="24" 
							v-if="amount"
							style="margin-top:-10px">当前资产余额：{{amount}}</el-col>
						
						<el-col :lg="24">
							<div class="transferInpListLeft">转账详情</div>
						</el-col>
						
						<div class="paraWrap" style="clear:both;margin-bottom:40px;">
							<el-row class="top">
								<el-col :lg="11">
									目标地址
								</el-col>
								<el-col :lg="11">
									转出数量
								</el-col>
							</el-row>
							<el-row 
								v-for="(item, index) in params.receive_info"
								:key="index"
								style="margin-bottom:20px;">
								<el-col :lg="10">
									<el-input v-model="item.to_address" placeholder="请输入目标地址"></el-input>
								</el-col>
								<el-col :lg="1">&nbsp;</el-col>
								<el-col :lg="10">
									<el-input v-model="item.to_amount" placeholder="请输入要转出的资产数量"></el-input>
								</el-col>
								<el-col :lg="1">&nbsp;</el-col>
								<el-col :lg="2" class="btn" >
									<span @click="delPara(index)">删除</span>
								</el-col>
								<el-col :md="24" style="padding-top:10px;">
									所属账户：
								</el-col>
							</el-row>
							<el-row class="addBtn">
								<el-col>
									<span class="addBtnWrap" @click="addPara">+添加转账地址</span>
								</el-col>
							</el-row>
							
						</div>
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
								@click="transfer"
								class="transferAccoutItemBtn">{{isSingleSign?'提交交易':'生成签名文件'}}</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		
		
		
	</div>
</template>

<script>
	import { 
		getAddressLists, 
		getAssetLists, 
		transferMultsign, 
		transferSinglesign, 
		queryAssetAmount 
	} from '@/util/server.js'
	
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
			
			var query = this.$route.query;
			var address_id = query.address_id;
			if(address_id){
				var asset_id = query.asset_id;
				var asset_name = query.asset_name;
				
				this.params.from_address = address_id;
				this.params.asset_name = asset_name;
				this.params.asset_id = asset_id;
			}
			
			
			
			var formdata = new FormData();
			
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
				
			var params = {account_alias:account_alias}
			getAddressLists.bind(this)(params)
				.then(({data})=>{
					this.address = data.data;
				})
		},
		data(){
			return {
				isSingleSign:false,//是否是单签
				
				allAssetsLists:[],
				address:[],
				
				to_address:'',
				amount:'',
			
			
				params:{
					password:"",
					amount:'',
					asset_name:"",
					asset_id:"",
					from_address:'',
					receive_info:[{to_address:'',to_amount:''}]
				},
				
				
			}
		},
		methods:{
			delPara(index){
				console.log(index,111)
				if(index>0){
					this.params.receive_info.splice(index, 1);
				}
			},
			addPara(){
				this.params.receive_info.push({to_address:'', to_amount:''})
			},
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
						console.log(data,9898)
						this.amount = data.data;
					})
			},
			transfer(){
				
				let para = Object.assign({},this.params);
				var receive_info = [{
						to_address:this.to_address,
						to_amount:this.to_amount-0||0
					}]
				
				
				para.receive_info.map((item,index)=>{
					var to_amount = item.to_amount - 0;
					para.receive_info[index].to_amount = to_amount;})
				para.amount = para.receive_info.reduce((pre,cur)=>{
					return (pre-0) + (cur.to_amount-0)
				},0)
				
				if(this.isSingleSign){
					this.signleSignFn(para)
				}else{
					this.mutiSignFn(para);
				}
				
				
				
				
				
			},
			signleSignFn(para){
				transferSinglesign.bind(this)(para) 
					.then(({data})=>{
						console.log(data,111)
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
								message:data.detail
							})
						}
					})
			},
			mutiSignFn(para){
				transferMultsign.bind(this)(para)
					.then(({data})=>{
						console.log(data,222)
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
			}
		},
	}
</script>

<style lang="scss">
	.transferWrap{
		
	}
	
</style>