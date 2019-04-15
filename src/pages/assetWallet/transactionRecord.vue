<template>
	<div class="outerWrap transactionRecordWrap">
		<el-row>
			<el-col >
				
				<div class="commonTitle_one">
					资产钱包
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>交易记录</span>
					</span>
				</div>
				
				
				<div class="consoleRecordsWrap">
					<div class="commonTitle_two">交易记录</div>
					
					<el-row class="transactionRecordContentWrap">
						<el-col :lg="24">
							<span>资产类型</span>
							<span>{{asset_name}}</span>
						</el-col>
						<el-col :lg="24" v-if="address_id">
							<span>所在地址</span>
							<span>{{address_id}}</span>
						</el-col>
						
					</el-row>
					
					<div class="consoleListsWrap">
						<div 
							class="consoleListWrap" 
							v-for="(item,index) in lists"
							:key="index">
							
							<div class="inner" v-if="item.tx_type==1">
								<el-row 
									class="consoleListIDWrap" 
									:gutter="20">
									<el-col :lg="12">
										<span>交易ID</span>
										<span>{{item.tx_id}}</span>
										
										<span>已确认</span>
									</el-col>
									<el-col :lg="12">
										{{item.to_time}}
									</el-col>
								</el-row>
								<el-row 
									:gutter="20"
									class="consoleList_list"
									v-for="(list,i) in item.to"
									:key="i">
									<el-col :lg="4">
										<span>收入</span>
									</el-col>
									<el-col :lg="10">
										<span>To</span>
										<span>{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</span>
									</el-col>
									<el-col :lg="6">+ {{item.asset_amount}}</el-col>
									<el-col :lg="4">{{asset_name||'--'}}</el-col>
								</el-row>
								
								<el-row 
									:gutter="20"
									class="consoleList_list"
									v-for="(list,i) in item.from"
									:key="i">
									<el-col :lg="4">
										<span class="out">支出</span>
									</el-col>
									<el-col :lg="10">
										<span>From</span>
										<span>{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</span>
									</el-col>
									<el-col :lg="6">- {{item.asset_amount}}</el-col>
									<el-col :lg="4">{{asset_name||'--'}}</el-col>
								</el-row>
							</div>
							
							<div class="inner" v-if="item.tx_type==2">
								<el-row 
									class="consoleListIDWrap" 
									:gutter="20">
									<el-col :lg="12">
										<span>交易ID</span>
										<span>{{item.tx_id}}</span>
										
										<span>已确认</span>
									</el-col>
									<el-col :lg="12">
										{{item.to_time}}
									</el-col>
								</el-row>
								
								<el-row 
									:gutter="20"
									class="consoleList_list"
									v-for="(list,i) in item.to"
									:key="i">
									<el-col :lg="4">
										<span class="issue">发行</span>
									</el-col>
									<el-col :lg="10">
										<span>To</span>
										<span>{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</span>
									</el-col>
									<el-col :lg="6">+ {{item.asset_amount}}</el-col>
									<el-col :lg="4">{{item.to.asset_name||'--'}}</el-col>
								</el-row>
							</div>
							
							<div class="inner" v-if="item.tx_type==3">
								<el-row 
									class="consoleListIDWrap" 
									:gutter="20">
									<el-col :lg="12">
										<span>交易ID</span>
										<span>{{item.tx_id}}</span>
										
										<span>已确认</span>
									</el-col>
									<el-col :lg="12">
										{{item.to_time}}
									</el-col>
								</el-row>
								
								<el-row 
									:gutter="20"
									class="consoleList_list"
									v-for="(list,i) in item.from"
									:key="i">
									<el-col :lg="4">
										<span class="retire">销毁</span>
									</el-col>
									<el-col :lg="10">
										<span>From</span>
										<span>{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</span>
									</el-col>
									<el-col :lg="6">- {{item.asset_amount}}</el-col>
									<el-col :lg="4">{{asset_name||'--'}}</el-col>
								</el-row>
							</div>
							
						</div>
						
					</div>
					
					
				</div>
		
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	
	import { getAssetRecords, getAssetRecordsByAddress } from '@/util/server.js'
	import Vue from 'vue';
	import { Row, Col } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	
	export default {
		created(){
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var query =  this.$route.query;
			this.asset_name = query.asset_name;
			this.address_id = query.address_id;
			
			
			var para = Object.assign({},accountInfo,query)
			if(query.type==='address'){
				this.getLists2(para)
			}else{
				this.getLists1(para)
			}
		},
		data(){
			return {
				asset_name:'',
				address_id:"",
				lists:[]
			}
		},
		methods:{
			getLists1(para){
				getAssetRecords.bind(this)(para)
					.then(({data})=>{
						console.log(data,111)
						this.lists = data.data.tx_list
					})
			},
			getLists2(para){
				getAssetRecordsByAddress.bind(this)(para)
					.then(({data})=>{
						console.log(data,222)
						this.lists = data.data.tx_list
					})
			}
		},
	}
</script>

<style lang="scss">
	.transactionRecordWrap{
		
		.consoleRecordsWrap{
			padding-right:30px;
		}
		
		.transactionRecordContentWrap{
			padding-bottom:20px;
			>div{
				line-height:36px;
				font-size:13px;
				>span:nth-of-type(2){
					margin-left:40px;
				}
			}
		}
		.inner{
			margin-bottom:30px;
			border:0!important;
		}
	}
	
</style>